import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import BookmarkIcon from '@material-ui/icons/Bookmarks';
import PublishIcon from '@material-ui/icons/Create';
import DraftIcon from '@material-ui/icons/FileCopy';
import ProfileIcon from '@material-ui/icons/Person';
import RepliesIcon from '@material-ui/icons/Reply';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

const NavSide = props => {
  const { user } = props;
  return (
    <div className="row">
      <div className="col-4" />
      <div className="col-8">
        <MenuList>
          <Link href="/dashboard/publish" passHref>
            <a>
              <MenuItem>
                <ListItemIcon>
                  <PublishIcon />
                </ListItemIcon>
                <ListItemText inset primary="Publish" />
              </MenuItem>
            </a>
          </Link>
          <Link href="/dashboard/replies" passHref>
            <a>
              <MenuItem>
                <ListItemIcon>
                  <RepliesIcon />
                </ListItemIcon>
                <ListItemText inset primary="Replies" />
              </MenuItem>
            </a>
          </Link>
          <Link href="/dashboard/drafts" passHref>
            <a>
              <MenuItem>
                <ListItemIcon>
                  <DraftIcon />
                </ListItemIcon>
                <ListItemText inset primary="Drafts" />
              </MenuItem>
            </a>
          </Link>
          <Divider />
          <Link href="/bookmarks" passHref>
            <a>
              <MenuItem>
                <ListItemIcon>
                  <BookmarkIcon />
                </ListItemIcon>
                <ListItemText inset primary="Bookmarks" />
              </MenuItem>
            </a>
          </Link>
          <Link as={`@${user}`} href={`/blog?author=${user}`} passHref>
            <a>
              <MenuItem>
                <ListItemIcon>
                  <ProfileIcon />
                </ListItemIcon>
                <ListItemText inset primary="Profile" />
              </MenuItem>
            </a>
          </Link>
        </MenuList>
      </div>
    </div>
  );
};

NavSide.propTypes = {
  user: PropTypes.string.isRequired,
};

export default NavSide;
