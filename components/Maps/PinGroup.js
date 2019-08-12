import React, { Component } from 'react';

class PinGroups extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { cluster } = this.props;
    return (
      <div style={{ background: '#f28a25' }}>
        {cluster.properties.point_count}
      </div>
    );
  }
}

export default PinGroups;
