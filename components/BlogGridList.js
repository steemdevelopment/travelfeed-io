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
import Router from "next/router";

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    color: "white"
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  card: {},
  media: {
    height: 140
  }
};

class BlogGridList extends Component {
  state = {
    stream: this.props.stream
  };
  render() {
    return (
      <Fragment>
        <div style={styles.root}>
          <GridList style={styles.gridList} cols={2.5}>
            {this.props.stream.map(post => {
              const json = JSON.parse(post.json_metadata);
              if (
                post.author === "travelfeed" &&
                json.tags.indexOf("travelfeeddaily") > -1 === true
              ) {
                const image = getImage(
                  post.json_metadata,
                  post.body,
                  "600x400"
                );
                return (
                  <GridListTile key={post.permlink}>
                    <img
                      src={image}
                      onClick={() =>
                        Router.push(`/@${post.author}/${post.permlink}`)
                      }
                      style={{ cursor: "pointer" }}
                    />
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
                          styles={{
                            root: styles.titleBar,
                            title: styles.title
                          }}
                          actionIcon={
                            <IconButton>
                              <FlightIcon style={styles.title} />
                            </IconButton>
                          }
                        />
                      </a>
                    </Link>
                  </GridListTile>
                );
              }
            })}
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
