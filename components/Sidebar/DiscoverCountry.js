import Button from "@material-ui/core/Button";
import { teal } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import Link from "next/link";
import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import { nameFromCC, random_country, slugFromCC } from "../../helpers/countryCodes";
import { imageProxy } from "../../helpers/getImage";
import { GET_POSTS } from "../../helpers/graphql/posts";
import HeaderCard from "../General/HeaderCard";

class CountryExplore extends Component {
  render() {
    const country_code = random_country;
    const country_name = nameFromCC(country_code);
    const countryslug = slugFromCC(country_code);
    return (
      <Fragment>
        <Query
          query={GET_POSTS}
          variables={{
            country_code,
            limit: 5,
            min_curation_score: 10000
          }}
        >
          {({ data, loading, error }) => {
            if (loading || error || data.post === null) {
              return <Fragment />;
            }
            return (
              <Fragment>
                <HeaderCard
                  noborder
                  title={`Discover ${country_name}`}
                  titlesize="h5"
                  background={teal[600]}
                  content={
                    <div className="pt-2">
                      {data.posts.map((post, index) => {
                        return (
                          <div key={index}>
                            <Link
                              as={`/@${post.author}/${post.permlink}`}
                              href={`/post?author=${post.author}&permlink=${
                                post.permlink
                              }`}
                              passHref
                            >
                              <a>
                                <div className="container-fluid">
                                  <div className="row h-100 pl-3">
                                    <div
                                      className="col-3 my-auto"
                                      style={{
                                        backgroundImage:
                                          "url(" +
                                          imageProxy(post.img_url, 100, 100) +
                                          ")",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center center",
                                        backgroundSize: "cover",
                                        width: "70px",
                                        height: "70px"
                                      }}
                                    />
                                    <div className="col-9 my-auto">
                                      <span className="text-dark">
                                        {post.title}
                                      </span>
                                      <br />
                                      <em>
                                        <Link
                                          as={`/@${post.author}`}
                                          href={`/blog?author=${post.author}`}
                                          passHref
                                        >
                                          <a className="text-dark">
                                            by @{post.author}
                                          </a>
                                        </Link>
                                      </em>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </Link>
                            <Divider className="mt-2 mb-2 ml-3 mr-3" />
                          </div>
                        );
                      })}
                      <div className="text-center pt-4">
                        <Link
                          as={`/destinations/${countryslug}`}
                          href={`/destinations?country=${countryslug}`}
                          passHref
                        >
                          <Button variant="contained" color="primary">
                            <a className="text-light">Explore More</a>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  }
                />
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default CountryExplore;
