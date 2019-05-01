import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FeaturedIcon from "@material-ui/icons/Star";
import HotIcon from "@material-ui/icons/FlightTakeoff";
import FavoriteIcon from "@material-ui/icons/Favorite";
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
          <Link
            as={`/hot/${this.props.tags}`}
            href={`/tag?tags=${this.props.tags}&orderby=sc_hot`}
            passHref
          >
            <Tab icon={<HotIcon />} label="TAKING OFF" />
          </Link>
          <Link
            as={`/featured/${this.props.tags}`}
            href={`/tag?tags=${this.props.tags}&orderby=featured`}
            passHref
          >
            <Tab icon={<FeaturedIcon />} label="FEATURED" />
          </Link>
          <Link
            as={`/favorites/${this.props.tags}`}
            href={`/tag?tags=${this.props.tags}&orderby=total_votes`}
            passHref
          >
            <Tab icon={<FavoriteIcon />} label="FAVORITES" />
          </Link>
        </Tabs>
      </Paper>
    );
  }
}

IconLabelTabs.propTypes = {
  selection: PropTypes.number,
  tags: PropTypes.string
};

export default IconLabelTabs;
