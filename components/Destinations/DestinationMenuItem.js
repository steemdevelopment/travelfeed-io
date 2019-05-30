import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import PropTypes from 'prop-types';

class DestinationMenuItem extends Component {
  state = {
    active: false,
    firstmount: true,
  };

  componentDidMount() {
    this.props.active && !this.state.active && this.state.firstmount
      ? this.setState({ active: true })
      : '';
  }

  render() {
    return (
      <ClickAwayListener onClickAway={() => this.setState({ active: false })}>
        <MenuItem
          onClick={() => {
            this.props.onClick(this.props.text);
            this.setState({ active: true });
          }}
          selected={this.state.active}
        >
          <ListItemIcon>{this.props.icon}</ListItemIcon>
          <ListItemText inset primary={this.props.text} />
        </MenuItem>
      </ClickAwayListener>
    );
  }
}

DestinationMenuItem.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool,
};
export default DestinationMenuItem;
