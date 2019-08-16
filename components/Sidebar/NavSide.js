import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import BookmarkIcon from '@material-ui/icons/Bookmarks';
import PublishIcon from '@material-ui/icons/Create';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DraftIcon from '@material-ui/icons/FileCopy';
import ProfileIcon from '@material-ui/icons/Person';
import RepliesIcon from '@material-ui/icons/Reply';
import PropTypes from 'prop-types';
import React from 'react';
import Link from '../../lib/Link';

const NavSide = props => {
  const { user } = props;
  return (
    <div className="row">
      <div className="col-9">
        <MenuList>
          <Link color="textPrimary" href="/dashboard" passHref>
            <a>
              <MenuItem>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </MenuItem>
            </a>
          </Link>
          <Link color="textPrimary" href="/dashboard/publish" passHref>
            <a>
              <MenuItem>
                <ListItemIcon>
                  <PublishIcon />
                </ListItemIcon>
                <ListItemText primary="Publish" />
              </MenuItem>
            </a>
          </Link>
          <Link color="textPrimary" href="/dashboard/replies" passHref>
            <a>
              <MenuItem>
                <ListItemIcon>
                  <RepliesIcon />
                </ListItemIcon>
                <ListItemText primary="Replies" />
              </MenuItem>
            </a>
          </Link>
          <Link color="textPrimary" href="/dashboard/drafts" passHref>
            <a>
              <MenuItem>
                <ListItemIcon>
                  <DraftIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </MenuItem>
            </a>
          </Link>
          <Divider />
          <Link color="textPrimary" href="/bookmarks" passHref>
            <a>
              <MenuItem>
                <ListItemIcon>
                  <BookmarkIcon />
                </ListItemIcon>
                <ListItemText primary="Bookmarks" />
              </MenuItem>
            </a>
          </Link>
          <Link
            color="textPrimary"
            as={`@${user}`}
            href={`/blog?author=${user}`}
            passHref
          >
            <a>
              <MenuItem>
                <ListItemIcon>
                  <ProfileIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </MenuItem>
            </a>
          </Link>
        </MenuList>
      </div>
      <div className="col-3" />
    </div>
  );
};

NavSide.propTypes = {
  user: PropTypes.string.isRequired,
};

export default NavSide;
