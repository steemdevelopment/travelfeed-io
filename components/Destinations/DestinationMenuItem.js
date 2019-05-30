import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
    const { onClick, text, icon } = this.props;
    const { active } = this.state;
    return (
      <ClickAwayListener onClickAway={() => this.setState({ active: false })}>
        <MenuItem
          onClick={() => {
            onClick(text);
            this.setState({ active: true });
          }}
          selected={active}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText inset primary={text} />
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
