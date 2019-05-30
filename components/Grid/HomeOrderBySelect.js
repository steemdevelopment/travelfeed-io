import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import DiscoverIcon from '@material-ui/icons/Explore';
import FeedIcon from '@material-ui/icons/Favorite';
import HotIcon from '@material-ui/icons/FlightTakeoff';
import NewIcon from '@material-ui/icons/Restore';
import FeaturedIcon from '@material-ui/icons/Star';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

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
          <Link as="/created" href="/?orderby=created_at" passHref>
            <Tab
              icon={<NewIcon />}
              label="NEW"
              className="d-none d-xl-block d-lg-block d-md-block d-sm-block"
            />
          </Link>
          <Link as="/hot" href="/?orderby=sc_hot" passHref>
            <Tab icon={<HotIcon />} label="TAKING OFF" />
          </Link>
          <Link as="/discover" href="/?orderby=random" passHref>
            <Tab icon={<DiscoverIcon />} label="DISCOVER" />
          </Link>
          <Link as="/featured" href="/?orderby=featured" passHref>
            <Tab icon={<FeaturedIcon />} label="FEATURED" />
          </Link>
          {this.props.showFeed && (
            <Link as="/feed" href="/?orderby=feed" passHref>
              <Tab icon={<FeedIcon />} label="FEED" />
            </Link>
          )}
        </Tabs>
      </Paper>
    );
  }
}

IconLabelTabs.propTypes = {
  showFeed: PropTypes.string.isRequired,
  selection: PropTypes.number.isRequired,
};

export default IconLabelTabs;
