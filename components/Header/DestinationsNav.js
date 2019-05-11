import React, { Component } from "react";
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
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import PropTypes from "prop-types";

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
    this.props.onClose();
  };
  render() {
    if (this.state.random === undefined) {
      const random_country =
        popular_countries[Math.floor(Math.random() * popular_countries.length)];
      this.setState({ random: slugFromCC(random_country) });
    }
    return (
      <div
        className="w-100 container-fluid"
        style={{ position: "fixed", zIndex: 99999 }}
      >
        <Paper>
          <ClickAwayListener onClickAway={this.props.onClose}>
            <div className="row">
              <div className="col-xl-3 col-lg-4 col-md-5">
                <MenuList>
                  <DestinationMenuItem
                    onClick={this.onMenuClick.bind(this)}
                    icon={<CountryIcon />}
                    text="Popular Countries"
                    active
                  />
                  <DestinationMenuItem
                    onClick={this.onMenuClick.bind(this)}
                    icon={<CityIcon />}
                    text="Popular Places"
                  />
                  <Link href="/map" passHref>
                    <a>
                      <DestinationMenuItem
                        onClick={this.props.onClose}
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
              <div className="col-xl-9 col-lg-8 col-md-7">
                {(this.state.selection === "Popular Places" && (
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-4">
                        <MenuList>
                          <MenuItem>
                            <h4>Europe</h4>
                          </MenuItem>
                          <DestinationCityColumn
                            onClick={this.props.onClose}
                            cities={[
                              {
                                country_slug: "spain",
                                subdivision: "Community of Madrid",
                                city: "Madrid",
                                nocity: true
                              },
                              {
                                country_slug: "spain",
                                subdivision: "Catalonia",
                                city: "Barcelona"
                              },
                              {
                                country_slug: "spain",
                                subdivision: "Valencian Community",
                                city: "Valencia",
                                nocity: true
                              },
                              {
                                country_slug: "portugal",
                                subdivision: "Área Metropolitana de Lisboa",
                                city: "Lisbon",
                                nocity: true
                              },
                              {
                                country_slug: "italy",
                                subdivision: "Lazio",
                                city: "Rome",
                                nocity: true
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
                                city: "Dublin",
                                nocity: true
                              },
                              // {
                              //   country_slug: "vietnam",
                              //   subdivision: "",
                              //   city: "Hoi An"
                              // },
                              {
                                country_slug: "poland",
                                subdivision: "Lesser Poland Voivodeship",
                                city: "Krakow"
                              },
                              {
                                country_slug: "france",
                                subdivision: "Ile-de-France",
                                city: "Paris",
                                nocity: true
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
                              // {
                              //   country_slug: "norway",
                              //   subdivision: "Oslo",
                              //   city: "Oslo",
                              //   nocity: true
                              // }
                              // { country_slug: "germany", subdivision: "", city: "Berlin" },
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
                            onClick={this.props.onClose}
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
                              // {
                              //   country_slug: "china",
                              //   subdivision: "",
                              //   city: "Shanghai"
                              // },

                              {
                                country_slug: "thailand",
                                subdivision: "Bangkok",
                                city: "Bangkok",
                                nocity: true
                              },
                              {
                                country_slug: "taiwan",
                                subdivision: "New Taipei",
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
                                country_slug: "russia",
                                subdivision: "Saint Petersburg",
                                city: "Sankt Petersburg",
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
                                city: "Kyoto",
                                nocity: true
                              },

                              {
                                country_slug: "united-arab-emirates",
                                subdivision: "Dubai",
                                city: "Dubai",
                                nocity: true
                              }
                              // {
                              //   country_slug: "south-africa",
                              //   subdivision: "",
                              //   city: "Cape Town"
                              // }
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
                            onClick={this.props.onClose}
                            cities={[
                              {
                                country_slug: "united-states",
                                subdivision: "California",
                                city: "San Francisco"
                              },
                              {
                                country_slug: "united-states",
                                subdivision: "Illinois",
                                city: "Chicago",
                                nocity: true
                              },
                              {
                                country_slug: "united-states",
                                subdivision: "California",
                                city: "Los Angeles"
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
                              // {
                              //   country_slug: "brazil",
                              //   subdivision: "",
                              //   city: "Rio de Janeiro"
                              // },
                              // {
                              //   country_slug: "mexico",
                              //   subdivision: "Mexico City",
                              //   city: "Mexico City"
                              // },

                              {
                                country_slug: "ecuador",
                                subdivision: "Galápagos",
                                city: "Galápagos",
                                nocity: true
                              },
                              {
                                country_slug: "argentina",
                                subdivision: "Autonomous City of Buenos Aires",
                                city: "Buenos Aires",
                                nocity: true
                              },
                              // {
                              //   country_slug: "india",
                              //   subdivision: "",
                              //   city: "Mumbai"
                              // },
                              {
                                country_slug: "canada",
                                subdivision: "Ontario",
                                city: "Toronto"
                              },
                              // {
                              //   country_slug: "portugal",
                              //   subdivision: "",
                              //   city: "Porto"
                              // },
                              {
                                country_slug: "australia",
                                subdivision: "New South Wales",
                                city: "Sydney"
                              },
                              {
                                country_slug: "australia",
                                subdivision: "Victoria",
                                city: "Melbourne"
                              }
                              // {
                              //   country_slug: "russia",
                              //   subdivision: "Moscow",
                              //   city: "Moscow",
                              //   nicity: true
                              // }
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
                            onClick={this.props.onClose}
                            country_codes={[
                              "at",
                              "ch",
                              "fr",
                              "de",
                              "is",
                              "pl",
                              "pt",
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
                            onClick={this.props.onClose}
                            country_codes={[
                              "cn",
                              "in",
                              "jp",
                              "my",
                              "ph",
                              "ru",
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
                            onClick={this.props.onClose}
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
          </ClickAwayListener>
        </Paper>
      </div>
    );
  }
}

DestinationsNav.propTypes = {
  onClose: PropTypes.func
};

export default DestinationsNav;
