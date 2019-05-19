import React, { Component, Fragment } from "react";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "next/link";
import CountryIcon from "@material-ui/icons/LandScape";
import CityIcon from "@material-ui/icons/LocationCity";
import MapIcon from "@material-ui/icons/Map";
import RandomIcon from "@material-ui/icons/Explore";
import Paper from "@material-ui/core/Paper";
import DestinationMenuItem from "./DestinationMenuItem";
import DestinationCountryColumn from "./DestinationCountryColumn";
import DestinationCityColumn from "./DestinationCityColumn";
import { slugFromCC, popular_countries } from "../../helpers/country_codes";
import PropTypes from "prop-types";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";

class DestinationsNav extends Component {
  state = {
    selection: undefined,
    random: undefined
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
            paddingLeft: "0px",
            position: "fixed",
            zIndex: 99999,
            top: "65px",
            right: "0px",
            left: "0px"
          }}
        >
          <Popper open={this.props.showDest} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4">
                      <MenuList>
                        <DestinationMenuItem
                          onClick={this.onMenuClick.bind(this)}
                          icon={<CountryIcon />}
                          text="Popular Countries"
                          active={this.state.selection !== "Popular Places"}
                        />
                        <DestinationMenuItem
                          onClick={this.onMenuClick.bind(this)}
                          icon={<CityIcon />}
                          text="Popular Places"
                          active={this.state.selection === "Popular Places"}
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
                      {(this.state.selection === "Popular Places" && (
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-4">
                              <MenuList>
                                <MenuItem>
                                  <h4>Europe</h4>
                                </MenuItem>
                                <DestinationCityColumn
                                  onClick={this.props.closeDest}
                                  cities={[
                                    {
                                      country_slug: "spain",
                                      subdivision: "Community of Madrid",
                                      city: "Madrid"
                                    },
                                    {
                                      country_slug: "spain",
                                      subdivision: "Catalonia",
                                      city: "Barcelona"
                                    },
                                    {
                                      country_slug: "spain",
                                      subdivision: "Valencian Community",
                                      city: "Valencia"
                                    },
                                    {
                                      country_slug: "portugal",
                                      subdivision:
                                        "Área Metropolitana de Lisboa",
                                      city: "Lisbon"
                                    },
                                    {
                                      country_slug: "italy",
                                      subdivision: "Lazio",
                                      city: "Rome"
                                    },
                                    {
                                      country_slug: "germany",
                                      subdivision: "Bavaria",
                                      city: "Munich"
                                    },
                                    {
                                      country_slug: "united-kingdom",
                                      subdivision: "England",
                                      city: "London"
                                    },
                                    {
                                      country_slug: "ireland",
                                      subdivision: "Leinster",
                                      city: "Dublin"
                                    },
                                    {
                                      country_slug: "poland",
                                      subdivision: "Lesser Poland Voivodeship",
                                      city: "Krakow"
                                    },
                                    {
                                      country_slug: "france",
                                      subdivision: "Ile-de-France",
                                      city: "Paris"
                                    },
                                    {
                                      country_slug: "austria",
                                      subdivision: "Vienna",
                                      city: "Vienna",
                                      nocity: true
                                    },
                                    {
                                      country_slug: "netherlands",
                                      subdivision: "North Holland",
                                      city: "Amsterdam"
                                    }
                                  ]}
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
                                  cities={[
                                    {
                                      country_slug: "singapore",
                                      subdivision: "Singapore",
                                      city: "Singapore",
                                      nocity: true
                                    },
                                    {
                                      country_slug: "malaysia",
                                      subdivision: "Kuala Lumpur",
                                      city: "Kuala Lumpur",
                                      nocity: true
                                    },
                                    {
                                      country_slug: "malaysia",
                                      subdivision: "Penang",
                                      city: "Penang",
                                      nocity: true
                                    },
                                    {
                                      country_slug: "indonesia",
                                      subdivision: "Bali",
                                      city: "Bali",
                                      nocity: true
                                    },

                                    {
                                      country_slug: "thailand",
                                      subdivision: "Bangkok",
                                      city: "Bangkok",
                                      nocity: true
                                    },
                                    {
                                      country_slug: "taiwan",
                                      subdivision: "Taipei",
                                      city: "Taipei",
                                      nocity: true
                                    },
                                    {
                                      country_slug: "china",
                                      subdivision: "Beijing",
                                      city: "Beijing",
                                      nocity: true
                                    },
                                    {
                                      country_slug: "turkey",
                                      subdivision: "Marmara Region",
                                      city: "Istanbul"
                                    },
                                    {
                                      country_slug: "philippines",
                                      subdivision: "Cebu",
                                      city: "Cebu",
                                      nocity: true
                                    },

                                    {
                                      country_slug: "japan",
                                      subdivision: "Tokyo",
                                      city: "Tokyo",
                                      nocity: true
                                    },

                                    {
                                      country_slug: "japan",
                                      subdivision: "Kinki Region",
                                      city: "Kyoto"
                                    },

                                    {
                                      country_slug: "united-arab-emirates",
                                      subdivision: "Dubai",
                                      city: "Dubai",
                                      nocity: true
                                    }
                                  ]}
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
                                  cities={[
                                    {
                                      country_slug: "united-states",
                                      subdivision: "California",
                                      city: "San Francisco"
                                    },
                                    {
                                      country_slug: "united-states",
                                      subdivision: "Illinois",
                                      city: "Chicago"
                                    },
                                    {
                                      country_slug: "morocco",
                                      subdivision: "Marrakech-Safi",
                                      city: "Marrakesh"
                                    },
                                    {
                                      country_slug: "united-states",
                                      subdivision: "California",
                                      city: "California",
                                      nocity: true
                                    },
                                    {
                                      country_slug: "united-states",
                                      subdivision: "New York",
                                      city: "New York City"
                                    },
                                    {
                                      country_slug: "united-states",
                                      subdivision: "Hawaii",
                                      city: "Hawaii",
                                      nocity: true
                                    },
                                    {
                                      country_slug: "peru",
                                      subdivision: "Cusco",
                                      city: "Cusco"
                                    },
                                    {
                                      country_slug: "mexico",
                                      subdivision: "Yucatán",
                                      city: "Yucatan",
                                      nocity: true
                                    },
                                    {
                                      country_slug: "ecuador",
                                      subdivision: "Galápagos",
                                      city: "Galápagos",
                                      nocity: true
                                    },
                                    {
                                      country_slug: "argentina",
                                      subdivision:
                                        "Autonomous City of Buenos Aires",
                                      city: "Buenos Aires",
                                      nocity: true
                                    },
                                    {
                                      country_slug: "canada",
                                      subdivision: "Ontario",
                                      city: "Toronto"
                                    },
                                    {
                                      country_slug: "australia",
                                      subdivision: "New South Wales",
                                      city: "Sydney"
                                    }
                                  ]}
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
                                  country_codes={[
                                    "at",
                                    "ch",
                                    "fr",
                                    "de",
                                    "is",
                                    "pl",
                                    "ru",
                                    "nl",
                                    "no",
                                    "ro",
                                    "es",
                                    "gb"
                                  ]}
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
                                  country_codes={[
                                    "cn",
                                    "in",
                                    "jp",
                                    "my",
                                    "ph",
                                    "np",
                                    "lk",
                                    "kr",
                                    "th",
                                    "tr",
                                    "tw",
                                    "vn"
                                  ]}
                                />
                              </MenuList>
                            </div>{" "}
                            <div className="col-4">
                              <MenuList>
                                <MenuItem>
                                  <h4>World</h4>
                                </MenuItem>
                                <DestinationCountryColumn
                                  onClick={this.props.closeDest}
                                  country_codes={[
                                    "au",
                                    "nz",
                                    "ca",
                                    "us",
                                    "mx",
                                    "co",
                                    "pe",
                                    "cl",
                                    "br",
                                    "ar",
                                    "ma",
                                    "za"
                                  ]}
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
  showDest: PropTypes.bool
};

export default DestinationsNav;
