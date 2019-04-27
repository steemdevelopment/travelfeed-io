import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import RecentIcon from "@material-ui/icons/Restore";
import FeaturedIcon from "@material-ui/icons/Star";
import HotIcon from "@material-ui/icons/FlightTakeoff";
import FavoriteIcon from "@material-ui/icons/Favorite";

class IconLabelTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    this.setState({
      value: this.props.value
    });
  }
  render() {
    return (
      <Paper square>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          centered
        >
          <Tab
            icon={<RecentIcon />}
            label="NEW"
            onClick={() =>
              this.props.handleClick({
                orderby: "created_at",
                min_curation_score: 0,
                url: "created"
              })
            }
          />
          <Tab
            icon={<HotIcon />}
            label="TAKING OFF"
            onClick={() =>
              this.props.handleClick({
                orderby: "sc_hot",
                min_curation_score: 0,
                url: "hot"
              })
            }
          />
          <Tab
            icon={<FeaturedIcon />}
            label="FEATURED"
            onClick={() =>
              this.props.handleClick({
                orderby: "created_at",
                min_curation_score: 10000,
                url: "featured"
              })
            }
          />
          <Tab
            icon={<FavoriteIcon />}
            label="FAVOURITES"
            onClick={() =>
              this.props.handleClick({
                orderby: "total_votes",
                min_curation_score: 5000,
                url: "favourites"
              })
            }
          />
        </Tabs>
      </Paper>
    );
  }
}

IconLabelTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default IconLabelTabs;
