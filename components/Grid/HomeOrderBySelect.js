import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import NewIcon from "@material-ui/icons/Restore";
import FeaturedIcon from "@material-ui/icons/Star";
import HotIcon from "@material-ui/icons/FlightTakeoff";
import FeedIcon from "@material-ui/icons/Favorite";
import DiscoverIcon from "@material-ui/icons/Explore";
import Link from "next/link";

class IconLabelTabs extends React.Component {
  render() {
    return (
      <Paper square>
        <Tabs
          value={this.props.selection}
          onChange={this.handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          centered
        >
          <Link as={`/created`} href={`/?orderby=created_at`} passHref>
            <Tab icon={<NewIcon />} label="NEW" />
          </Link>
          <Link as={`/hot`} href={`/?orderby=sc_hot`} passHref>
            <Tab icon={<HotIcon />} label="TAKING OFF" />
          </Link>
          <Link as={`/discover`} href={`/?orderby=random`} passHref>
            <Tab icon={<DiscoverIcon />} label="DISCOVER" />
          </Link>
          <Link as={`/featured`} href={`/?orderby=featured`} passHref>
            <Tab icon={<FeaturedIcon />} label="FEATURED" />
          </Link>
          {this.props.showFeed && (
            <Link as={`/feed`} href={`/?orderby=feed`} passHref>
              <Tab icon={<FeedIcon />} label="FEED" />
            </Link>
          )}
        </Tabs>
      </Paper>
    );
  }
}

IconLabelTabs.propTypes = {
  showFeed: PropTypes.string,
  selection: PropTypes.number
};

export default IconLabelTabs;
