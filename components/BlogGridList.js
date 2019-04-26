import React, { Component, Fragment } from "react";
import { imageProxy } from "../helpers/getImage";
import Link from "next/link";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Typography from "@material-ui/core/Typography";
import { Query } from "react-apollo";
import { GET_BLOG_POSTS } from "../helpers/graphql/posts";

class BlogGridList extends Component {
  render() {
    return (
      <Fragment>
        <Query
          query={GET_BLOG_POSTS}
          variables={{ author: "travelfeed", limit: 5 }}
        >
          {({ data, loading, error }) => {
            if (loading || error || data.post === null) {
              return <Fragment />;
            }
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
                    {data.posts.map(post => {
                      const image = imageProxy(post.img_url, "700x0");
                      return (
                        <Link
                          as={`/@${post.author}/${post.permlink}`}
                          href={`/post?author=${post.author}&permlink=${
                            post.permlink
                          }`}
                          key={post.permlink}
                          passHref
                        >
                          <a>
                            <GridListTile
                              style={{
                                height: "250px"
                              }}
                            >
                              <div
                                className="second-slide"
                                style={{
                                  backgroundImage: `url(${image})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "center center",
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
                              />
                            </GridListTile>
                          </a>
                        </Link>
                      );
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
                          />
                        </GridListTile>
                      </a>
                    </Link>
                  </GridList>
                </div>
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

// class BlogGridList extends Component {
//   state = {
//     stream: this.props.stream
//   };
//   render() {
//     return (

//     );
//   }
// }

export default BlogGridList;
