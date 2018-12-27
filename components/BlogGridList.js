import React, { Component, Fragment } from "react";
import "@babel/polyfill";
import PropTypes from "prop-types";
import getImage from "../helpers/getImage";
import Link from "next/link";
import IconButton from "@material-ui/core/IconButton";
import FlightIcon from "@material-ui/icons/FlightTakeoff";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Typography from "@material-ui/core/Typography";

class BlogGridList extends Component {
  state = {
    stream: this.props.stream
  };
  render() {
    return (
      <Fragment>
        <Typography
          variant="h4"
          align="center"
          gutterBottom={true}
          className="pb-2"
        >
          From Our Blog
        </Typography>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            overflow: "hidden"
          }}
        >
          <GridList
            style={{ flexWrap: "nowrap", transform: "translateZ(0)" }}
            cols={2.5}
          >
            {this.props.stream.map(post => {
              const json = JSON.parse(post.json_metadata);
              if (
                post.author === "travelfeed" &&
                json.tags.indexOf("travelfeeddaily") > -1 === true
              ) {
                const image = getImage(post.json_metadata, post.body, "700x0");
                return (
                  <Link
                    as={`/@${post.author}/${post.permlink}`}
                    href={`/post?author=${post.author}&permlink=${
                      post.permlink
                    }`}
                    passHref
                  >
                    <a>
                      <GridListTile
                        key={post.permlink}
                        style={{
                          height: "250px"
                        }}
                      >
                        <div
                          className="second-slide"
                          style={{
                            backgroundImage: `url(${image})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center top",
                            backgroundSize: "cover",
                            width: "600px",
                            height: "100%"
                          }}
                        />
                        <GridListTileBar
                          title={post.title}
                          style={{
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
                          }}
                          actionIcon={
                            <IconButton>
                              <FlightIcon className="text-light" />
                            </IconButton>
                          }
                        />
                      </GridListTile>
                    </a>
                  </Link>
                );
              }
            })}

            <Link
              as={`/blog`}
              href={`/blog?author=travelfeed`}
              prefetch
              passHref
            >
              <a>
                <GridListTile
                  style={{
                    height: "250px"
                  }}
                  className="cpointer"
                >
                  <a>
                    <div
                      className="second-slide"
                      style={{
                        backgroundImage:
                          "url( https://steemitimages.com/900x0/https://cdn.steemitimages.com/DQmUT2EJjDC1CHPmbFaGyyCgmxnqdKQZDJNMwZEgskjZgPU/continuetoblog.jpg)",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                        width: "600px",
                        height: "100%"
                      }}
                    />
                  </a>
                  <GridListTileBar
                    title="Read more on our Blog"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
                    }}
                    actionIcon={
                      <IconButton>
                        <FlightIcon className="text-light" />
                      </IconButton>
                    }
                  />
                </GridListTile>
              </a>
            </Link>
          </GridList>
        </div>
      </Fragment>
    );
  }
}

BlogGridList.propTypes = {
  stream: PropTypes.array
};

export default BlogGridList;
