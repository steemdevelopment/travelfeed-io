import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import RandomIcon from '@material-ui/icons/Explore';
import CountryIcon from '@material-ui/icons/Landscape';
import CityIcon from '@material-ui/icons/LocationCity';
import MapIcon from '@material-ui/icons/Map';
import Link from 'next/link';
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
import DestinationCityColumn from '../Destinations/DestinationCityColumn';
import DestinationCountryColumn from '../Destinations/DestinationCountryColumn';
import DestinationMenuItem from '../Destinations/DestinationMenuItem';

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
        <div
          className="w-100 container bg-primary"
          style={{
            paddingLeft: '0px',
            position: 'fixed',
            zIndex: 99999,
            top: '65px',
            right: '0px',
            left: '0px',
          }}
        >
          <Popper open={this.props.showDest} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4">
                      <MenuList>
                        <DestinationMenuItem
                          onClick={this.onMenuClick}
                          icon={<CountryIcon />}
                          text="Popular Countries"
                          active={this.state.selection !== 'Popular Places'}
                        />
                        <DestinationMenuItem
                          onClick={this.onMenuClick}
                          icon={<CityIcon />}
                          text="Popular Places"
                          active={this.state.selection === 'Popular Places'}
                        />
                        <Link href="/map" passHref>
                          <a>
                            <DestinationMenuItem
                              onClick={this.props.closeDest}
                              icon={<MapIcon />}
                              text="Map"
                            />
                          </a>
                        </Link>
                        <Link
                          href={`/destinations?country=${this.state.random}`}
                          as={`/destinations/${this.state.random}`}
                          passHref
                        >
                          <a>
                            <DestinationMenuItem
                              onClick={this.newRandom}
                              icon={<RandomIcon />}
                              text="Random Destination"
                            />
                          </a>
                        </Link>
                      </MenuList>
                    </div>
                    <div className="col-xl-8 col-lg-8 col-md-8">
                      {(this.state.selection === 'Popular Places' && (
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
                      )) || (
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
                      )}
                    </div>
                  </div>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Fragment>
    );
  }
}

DestinationsNav.propTypes = {
  closeDest: PropTypes.func,
  showDest: PropTypes.bool,
};

export default DestinationsNav;
