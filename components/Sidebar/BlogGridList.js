import React, { Component, Fragment } from "react";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import { Query } from "react-apollo";
import { GET_BLOG_POSTS } from "../../helpers/graphql/posts";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import HeaderCard from "../General/HeaderCard";
import { indigo } from "@material-ui/core/colors";

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
                <HeaderCard
                  title="From Our Blog"
                  titlesize="h5"
                  background={indigo[600]}
                  content={data.posts.map((post, index) => {
                    return (
                      <div key={index}>
                        {index !== 0 && <Divider className="mt-2 mb-2" />}
                        <Link
                          as={`/@${post.author}/${post.permlink}`}
                          href={`/post?author=${post.author}&permlink=${
                            post.permlink
                          }`}
                          passHref
                        >
                          <a>
                            <ListItemText primary={post.title} />
                          </a>
                        </Link>
                      </div>
                    );
                  })}
                />
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default BlogGridList;
