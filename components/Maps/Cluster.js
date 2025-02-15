/* eslint-disable */
//  https://github.com/uber/react-map-gl/issues/507

import { point } from '@turf/helpers';
import PropTypes from 'prop-types';
import { Children, createElement, PureComponent } from 'react';
// import type { Node, Component } from 'react';
import { Marker } from 'react-map-gl';
import Supercluster from 'supercluster';

const childrenKeys = children =>
  Children.toArray(children).map(child => child.key);

const shallowCompareChildren = (prevChildren, newChildren) => {
  if (Children.count(prevChildren) !== Children.count(newChildren)) {
    return false;
  }

  const prevKeys = childrenKeys(prevChildren);
  const newKeys = new Set(childrenKeys(newChildren));
  // console.log(prevKeys.length === newKeys.size && prevKeys.every(key => newKeys.has(key)), {prevChildren, newChildren})
  return (
    prevKeys.length === newKeys.size && prevKeys.every(key => newKeys.has(key))
  );
};

class Cluster extends PureComponent {
  static displayName = 'Cluster';

  static defaultProps = {
    minZoom: 0,
    maxZoom: 16,
    radius: 35,
    extent: 512,
    nodeSize: 64,
  };

  constructor(props) {
    super(props);

    this.state = {
      clusters: [],
    };
  }

  componentDidMount() {
    this.createCluster(this.props);
    this.recalculate();

    this.props.map.on('moveend', this.recalculate);
  }

  componentWillReceiveProps(newProps) {
    const shouldUpdate =
      newProps.minZoom !== this.props.minZoom ||
      newProps.maxZoom !== this.props.maxZoom ||
      newProps.radius !== this.props.radius ||
      newProps.extent !== this.props.extent ||
      newProps.nodeSize !== this.props.nodeSize ||
      !shallowCompareChildren(this.props.children, newProps.children);

    if (shouldUpdate) {
      this.createCluster(newProps);
      this.recalculate();
    }
  }

  createCluster = props => {
    const {
      minZoom,
      maxZoom,
      radius,
      extent,
      nodeSize,
      children,
      innerRef,
    } = props;

    const cluster = new Supercluster({
      minZoom,
      maxZoom,
      radius,
      extent,
      nodeSize,
    });

    const points = Children.map(children, child => {
      if (child)
        return point([child.props.longitude, child.props.latitude], child);
      return null;
    });

    cluster.load(points);
    this.cluster = cluster;
    if (innerRef) innerRef(this.cluster);
  };

  recalculate = () => {
    const zoom = this.props.map.getZoom();
    const bounds = this.props.map.getBounds().toArray();
    const bbox = bounds[0].concat(bounds[1]);

    const clusters = this.cluster.getClusters(bbox, Math.floor(zoom));
    this.setState(() => ({ clusters }));
  };

  render() {
    const clusters = this.state.clusters.map(cluster => {
      if (cluster.properties.cluster) {
        const [longitude, latitude] = cluster.geometry.coordinates;
        return createElement(Marker, {
          longitude,
          latitude,
          // TODO size
          offsetLeft: -28 / 2,
          offsetTop: -28,
          children: createElement(this.props.element, {
            cluster,
            superCluster: this.cluster,
          }),
          key: `cluster-${cluster.properties.cluster_id}`,
        });
      }
      const { type, key, props } = cluster.properties;
      return createElement(type, { key, ...props });
    });
    return clusters;
  }
}

Cluster.propTypes = {
  /** Mapbox map object */
  map: PropTypes.object,

  /** Minimum zoom level at which clusters are generated */
  minZoom: PropTypes.number,

  /** Maximum zoom level at which clusters are generated */
  maxZoom: PropTypes.number,

  /** Cluster radius, in pixels */
  radius: PropTypes.number,

  /** (Tiles) Tile extent. Radius is calculated relative to this value */
  extent: PropTypes.number,

  /** Size of the KD-tree leaf node. Affects performance */
  nodeSize: PropTypes.number,

  /** ReactDOM element to use as a marker */
  element: PropTypes.func,

  /**
   * Callback that is called with the supercluster instance as an argument
   * after componentDidMount
   */
  /* eslint-disable react/no-unused-prop-types */
  innerRef: PropTypes.func,
  /* eslint-enable react/no-unused-prop-types */

  /** Markers as children */
  children: PropTypes.node,
};

export default Cluster;
