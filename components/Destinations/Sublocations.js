import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Query } from "react-apollo";
import { GET_SUBLOCATIONS } from "../../helpers/graphql/locations";

class Sublocations extends Component {
  render() {
    return (
      <Fragment>
        <Query query={GET_SUBLOCATIONS} variables={this.props.query}>
          {({ data }) => {
            if (data && data.location && data.location.length > 1) {
              return (
                <Fragment>
                  <div className="container">
                    <div
                      className="row p-2 justify-content-md-center"
                      style={{ backgroundColor: "rgba(52, 58, 64, 0.6)" }}
                    >
                      {data.location.map((location, index) => (
                        <div
                          key={index}
                          className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-6 text-center"
                        >
                          <Link
                            href={`/destinations?country=${
                              this.props.country_slug
                            }&subdivision=${
                              location.subdivision
                                ? location.subdivision
                                : `${this.props.query.subdivision}&city=${
                                    location.city
                                  }`
                            }`}
                            as={`/destinations/${this.props.country_slug}/${
                              location.subdivision
                                ? location.subdivision
                                : `${this.props.query.subdivision}/${
                                    location.city
                                  }`
                            }`}
                            passHref
                          >
                            <a className="text-light">
                              {location.city
                                ? location.city
                                : location.subdivision}
                            </a>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </Fragment>
              );
            }
            return <Fragment />;
          }}
        </Query>
      </Fragment>
    );
  }
}

Sublocations.propTypes = {
  query: PropTypes.object,
  country_slug: PropTypes.string
};

export default Sublocations;
