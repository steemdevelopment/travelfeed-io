/* eslint-disable  */
import React, { Component } from 'react';

class PinGroups extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { cluster } = this.props;
    return (
      <div
        style={{ background: '#f28a25' }}
        className="cpointer"
        onClick={() =>
          this.props.setPopupList({
            longitude: this.props.cluster.geometry.coordinates[0],
            latitude: this.props.cluster.geometry.coordinates[1],
            posts: this.props.superCluster.getLeaves(
              this.props.cluster.id,
              Infinity,
            ),
          })
        }
      >
        {cluster.properties.point_count}
      </div>
    );
  }
}

export default PinGroups;
