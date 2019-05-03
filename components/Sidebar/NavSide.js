import React, { Component } from "react";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "next/link";
import PublishIcon from "@material-ui/icons/Create";
import BookmarkIcon from "@material-ui/icons/Bookmarks";
import RepliesIcon from "@material-ui/icons/Reply";
import DraftIcon from "@material-ui/icons/FileCopy";
import ProfileIcon from "@material-ui/icons/Person";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";

class NavSide extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-4" />
        <div className="col-8">
          <MenuList>
            <Link
              as="/dashboard/publish"
              href="/dashboard?page=publish"
              passHref
            >
              <a>
                <MenuItem>
                  <ListItemIcon>
                    <PublishIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Publish" />
                </MenuItem>
              </a>
            </Link>
            <Link
              as="/dashboard/publish"
              href="/dashboard?page=replies"
              passHref
            >
              <a>
                <MenuItem>
                  <ListItemIcon>
                    <RepliesIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Replies" />
                </MenuItem>
              </a>
            </Link>
            <Link
              as="/dashboard/publish"
              href="/dashboard?page=drafts"
              passHref
            >
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
            <Link
              as={`@${this.props.user}`}
              href={`/blog?author=${this.props.user}`}
              passHref
            >
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
  }
}

NavSide.propTypes = {
  user: PropTypes.string
};

export default NavSide;
