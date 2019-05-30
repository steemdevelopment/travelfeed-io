import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { nameFromSlug, slugFromCC } from "../../helpers/countryCodes";

class DestinationCountryColumn extends Component {
  state = {
    active: false
  };
  render() {
    const slugs = [];
    this.props.country_codes.forEach(cc => slugs.push(slugFromCC(cc)));
    slugs.sort();
    return slugs.map(slug => {
      const name = nameFromSlug(slug);
      return (
        <Link
          key={slug}
          href={`/destinations?country=${slug}`}
          as={`/destinations/${slug}`}
          passHref
        >
          <a>
            <MenuItem
              onClick={() =>
                this.props.onClick && this.props.onClick(this.props.text)
              }
            >
              <ListItemText primary={name} />
            </MenuItem>
          </a>
        </Link>
      );
    });
  }
}

DestinationCountryColumn.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  country_codes: PropTypes.arrayOf(PropTypes.string)
};

export default DestinationCountryColumn;
