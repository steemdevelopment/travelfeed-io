import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import CuratorIcon from '@material-ui/icons/MoreVert';
import PopupState, {
  bindMenu,
  bindTrigger,
} from 'material-ui-popup-state/index';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { getRoles } from '../../helpers/token';
import AuthorBlacklist from './Actions/AuthorBlacklist';
import ChangeRoles from './Actions/ChangeRoles';

class PostMenu extends Component {
  state = {
    roles: [],
  };

  componentDidMount() {
    const roles = getRoles();
    this.setState({
      roles,
    });
  }

  render() {
    const { roles } = this.state;
    const { author, isCurator } = this.props;
    if (roles && roles.indexOf('curator') !== -1) {
      return (
        <PopupState variant="popover" popupId="demo-popup-menu">
          {popupState => (
            <React.Fragment>
              <IconButton {...bindTrigger(popupState)}>
                <CuratorIcon className="text-light" />
              </IconButton>
              <Menu {...bindMenu(popupState)}>
                <AuthorBlacklist author={author} />
                {roles.indexOf('admin') !== -1 && (
                  <ChangeRoles author={author} isCurator={isCurator} />
                )}
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      );
    }
    return <Fragment />;
  }
}

PostMenu.propTypes = {
  author: PropTypes.string.isRequired,
  isCurator: PropTypes.bool.isRequired,
};

export default PostMenu;
