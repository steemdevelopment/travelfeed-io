import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "next/link";
import PropTypes from "prop-types";

class DestinationCityColumn extends Component {
  state = {
    active: false
  };
  render() {
    const cities = this.props.cities;
    // http://www.javascriptkit.com/javatutors/arraysort2.shtml
    // Sort alphabetically by city name
    cities.sort((a, b) => {
      const nameA = a.city.toLowerCase(),
        nameB = b.city.toLowerCase();
      if (nameA < nameB)
        //sort string ascending
        return -1;
      if (nameA > nameB) return 1;
      return 0; //default return value (no sorting)
    });
    return cities.map(c => {
      return (
        <Link
          key={c.city}
          href={`/destinations?country=${c.country_slug}${
            c.nosubdivision ? "" : `&subdivision=${c.subdivision}`
          }${c.nocity ? "" : `&city=${c.city}`}`}
          as={`/destinations/${c.country_slug}${
            c.nosubdivision ? "" : `/${c.subdivision}`
          }${c.nocity ? "" : `/${c.city}`}`}
          passHref
        >
          <a>
            <MenuItem
              onClick={() =>
                this.props.onClick && this.props.onClick(this.props.text)
              }
            >
              <ListItemText primary={c.city} />
            </MenuItem>
          </a>
        </Link>
      );
    });
  }
}

DestinationCityColumn.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
  text: PropTypes.string
};
export default DestinationCityColumn;
