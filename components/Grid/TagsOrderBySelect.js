import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FeaturedIcon from "@material-ui/icons/Star";
import HotIcon from "@material-ui/icons/FlightTakeoff";
import FavoriteIcon from "@material-ui/icons/Favorite";

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
          <Tab
            icon={<HotIcon />}
            label="TAKING OFF"
            onClick={() =>
              this.props.handleClick({
                orderby: "sc_hot",
                min_curation_score: 0,
                url: "hot",
                selection: 0,
                title: "Taking Off",
                hasChanged: true
              })
            }
          />
          <Tab
            icon={<FeaturedIcon />}
            label="FEATURED"
            onClick={() =>
              this.props.handleClick({
                orderby: "sc_trend",
                min_curation_score: 5000,
                url: "featured",
                selection: 1,
                title: "Featured",
                hasChanged: true
              })
            }
          />
          <Tab
            icon={<FavoriteIcon />}
            label="FAVORITES"
            onClick={() =>
              this.props.handleClick({
                orderby: "total_votes",
                min_curation_score: 10000,
                url: "favorites",
                selection: 2,
                title: "Favorites",
                hasChanged: true
              })
            }
          />
        </Tabs>
      </Paper>
    );
  }
}

IconLabelTabs.propTypes = {
  selection: PropTypes.number,
  handleClick: PropTypes.func
};

export default IconLabelTabs;
