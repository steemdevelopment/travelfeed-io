import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { nameFromSlug, slugFromCC } from '../../helpers/countryCodes';

class DestinationCountryColumn extends Component {
  render() {
    const { onClick, text, country_codes } = this.props;
    const slugs = [];
    country_codes.forEach(cc => slugs.push(slugFromCC(cc)));
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
            <MenuItem onClick={() => onClick && onClick(text)}>
              <ListItemText primary={name} />
            </MenuItem>
          </a>
        </Link>
      );
    });
  }
}

DestinationCountryColumn.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  country_codes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DestinationCountryColumn;
