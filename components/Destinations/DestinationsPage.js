import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import {
  featured_cc_asia,
  featured_cc_europe,
  featured_cc_world,
  featured_places_asia,
  featured_places_europe,
  featured_places_world,
  popular_countries,
  slugFromCC,
} from '../../helpers/countryCodes';
import DestinationCityColumn from './DestinationCityColumn';
import DestinationCountryColumn from './DestinationCountryColumn';

class DestinationsNav extends Component {
  state = {
    selection: undefined,
    random: undefined,
  };

  onMenuClick = selection => {
    this.setState({ selection });
  };

  newRandom = () => {
    this.setState({ random: undefined });
    this.props.closeDest();
  };

  render() {
    if (this.state.random === undefined) {
      const random_country =
        popular_countries[Math.floor(Math.random() * popular_countries.length)];
      this.setState({ random: slugFromCC(random_country) });
    }
    return (
      <Fragment>
        <div className="d-none d-xl-block d-lg-block d-md-block pt-4" />
        <Grid container spacing={0} alignItems="center" justify="center">
          <Grid item lg={7} md={8} sm={11} xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h4" className="text-center p-3">
                  Popular Countries
                </Typography>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-4">
                      <MenuList>
                        <MenuItem>
                          <h4>Europe</h4>
                        </MenuItem>
                        <DestinationCountryColumn
                          onClick={this.props.closeDest}
                          country_codes={featured_cc_europe}
                        />
                      </MenuList>
                    </div>
                    <div className="col-4">
                      <MenuList>
                        <MenuItem>
                          <h4>Asia</h4>
                        </MenuItem>
                        <DestinationCountryColumn
                          onClick={this.props.closeDest}
                          country_codes={featured_cc_asia}
                        />
                      </MenuList>
                    </div>{' '}
                    <div className="col-4">
                      <MenuList>
                        <MenuItem>
                          <h4>World</h4>
                        </MenuItem>
                        <DestinationCountryColumn
                          onClick={this.props.closeDest}
                          country_codes={featured_cc_world}
                        />
                      </MenuList>
                    </div>
                  </div>
                </div>
                <Typography variant="h4" className="text-center p-3">
                  Popular Places
                </Typography>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-4">
                      <MenuList>
                        <MenuItem>
                          <h4>Europe</h4>
                        </MenuItem>
                        <DestinationCityColumn
                          onClick={this.props.closeDest}
                          cities={featured_places_europe}
                        />
                      </MenuList>
                    </div>
                    <div className="col-4">
                      <MenuList>
                        <MenuItem>
                          <h4>Asia</h4>
                        </MenuItem>
                        <DestinationCityColumn
                          onClick={this.props.closeDest}
                          cities={featured_places_asia}
                        />
                      </MenuList>
                    </div>
                    <div className="col-4">
                      <MenuList>
                        <MenuItem>
                          <h4>World</h4>
                        </MenuItem>
                        <DestinationCityColumn
                          onClick={this.props.closeDest}
                          cities={featured_places_world}
                        />
                      </MenuList>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <div className="d-none d-xl-block d-lg-block d-md-block pt-4" />
      </Fragment>
    );
  }
}

DestinationsNav.propTypes = {
  closeDest: PropTypes.func,
  showDest: PropTypes.bool,
};

export default DestinationsNav;
