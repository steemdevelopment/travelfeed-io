// https://github.com/Giners/mui-places-autocomplete/blob/master/demo/DemoGeocodeLatLong.jsx Copyright (c) 2017 Chris Austin
// Todo: Apply styles to search field, see https://material-ui.com/demos/app-bar/#app-bar-with-search-field
// Todo: Look into OSM alternative to google places (issues with privacy,
// at some point cost). Mapbox restricts their Geocoder to map queries (tos),
//  nominatim forbids autocomplete. Komoot photon, osmnames or pelias
//  (probably the best option, but complicated) could be considered.
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import MUIPlacesAutocomplete, {
  geocodeBySuggestion,
} from 'mui-places-autocomplete';
import NextHead from 'next/head';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { GMAPS_API_KEY } from '../../config';

// https://stackoverflow.com/questions/49040092/material-ui-v1-input-focus-style-override
const styles = theme => ({
  input: {
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    color: 'white',
    padding: '5px',
    transition: 'width 0.3s',
  },
  // Separate this part into it's own CSS class
  inputFocused: {
    width: '120%',
    backgroundColor: fade(theme.palette.common.white, 0.25),
    transition: 'width 0.3s',
  },
});

class Geocoder extends Component {
  // eslint-disable-next-line class-methods-use-this
  onSuggestionSelected(suggestion) {
    // Once a suggestion has been selected by your consumer you can use the
    // utility geocoding
    // functions to get the latitude and longitude for the selected suggestion.
    geocodeBySuggestion(suggestion)
      .then(results => {
        if (results.length < 1) {
          return;
        }
        const result = results[0];
        // A location box is not exact since countries are usually not
        // rectangular, therefore a query for Germany would result in posts
        // from neighbouring countries to be returned as well. Unlike the
        // subdivision, the country-code is consistant to the database,
        // adding it to the query improves the accuracy
        let args = '';
        const components =
          result.address_components[result.address_components.length - 1];
        const showlocations = result.address_components.length === 1;
        components.types.forEach(t => {
          if (t === 'country') {
            args = `&country_code=${components.short_name.toLowerCase()}&showlocations=${showlocations}`;
          }
        });
        let { bounds } = result.geometry;
        // Some exact locations have no boundary, so use the less exact viewport
        //  instead
        if (!bounds) {
          bounds = result.geometry.viewport;
        }
        Router.push(
          `/location?location_box=${bounds.ga.j},${bounds.na.j},${bounds.ga.l},${bounds.na.l}&formatted_address=${result.formatted_address}${args}`,
        );
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <NextHead>
          <script
            type="text/javascript"
            src={`https://maps.googleapis.com/maps/api/js?key=${GMAPS_API_KEY}&libraries=places`}
          />
        </NextHead>
        <MUIPlacesAutocomplete
          textFieldProps={{
            InputProps: {
              placeholder: 'Search for a place',
              className: classes.input,
              classes: { focused: classes.inputFocused },
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="end">
                  <SearchIcon className="text-light ml-1 mr-3" />
                </InputAdornment>
              ),
            },
          }}
          onSuggestionSelected={this.onSuggestionSelected}
          renderTarget={() => <div />}
        />
      </Fragment>
    );
  }
}

Geocoder.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Geocoder);
