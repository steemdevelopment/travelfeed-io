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
          variant="display1"
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
                const image = getImage(post.json_metadata, post.body, "900x0");
                return (
                  <GridListTile
                    key={post.permlink}
                    style={{
                      height: "250px"
                    }}
                  >
                    <Link
                      as={`/@${post.author}/${post.permlink}`}
                      href={`/post?author=${post.author}&permlink=${
                        post.permlink
                      }`}
                      passHref
                    >
                      <a>
                        <img src={image} />
                      </a>
                    </Link>
                    <Link
                      as={`/@${post.author}/${post.permlink}`}
                      href={`/post?author=${post.author}&permlink=${
                        post.permlink
                      }`}
                      passHref
                    >
                      <a>
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
                      </a>
                    </Link>
                  </GridListTile>
                );
              }
            })}
            <GridListTile
              style={{
                height: "250px"
              }}
            >
              <Link
                as={`/blog`}
                href={`/blog?author=travelfeed`}
                prefetch
                passHref
              >
                <a>
                  <img src="" />
                </a>
              </Link>
              <Link as={`/blog`} href={`/blog?author=travelfeed`} passHref>
                <a>
                  <GridListTileBar
                    title="See more on our Blog"
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
                </a>
              </Link>
            </GridListTile>
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
