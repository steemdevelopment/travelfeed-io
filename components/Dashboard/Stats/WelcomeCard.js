import React, { Component } from "react";
import Link from "next/link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import { green } from "@material-ui/core/colors";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";

class WelcomeCard extends Component {
  render() {
    return (
      <Card>
        <CardHeader
          style={{ background: green[600] }}
          title={
            <Typography variant="h4" align="center" className="p-2 text-light">
              Welcome, {this.props.user}!
            </Typography>
          }
        />
        <CardContent>
          <p>
            Welcome to &quot;TravelBlog&quot;, your personal TravelFeed
            Dashboard!
          </p>
          <p>
            Here you can manage everything related to your blog, for example:
          </p>
          <ul>
            <li>
              <Link
                as="/dashboard/publish"
                href="/dashboard?page=publish"
                passHref
              >
                <a>Write your next awesome travel post</a>
              </Link>
            </li>
            <li>
              <Link
                as="/dashboard/drafts"
                href="/dashboard?page=drafts"
                passHref
              >
                <a>Access your drafts and continue where you left off</a>
              </Link>
            </li>
            <li>
              <Link as="/dashboard/posts" href="/dashboard?page=posts" passHref>
                <a>View and edit your published posts</a>
              </Link>
            </li>
            <li>
              <Link
                as="/dashboard/replies"
                href="/dashboard?page=replies"
                passHref
              >
                <a>View and answer replies from your followers</a>
              </Link>
            </li>
            <li>
              <Link
                as="/dashboard/profile"
                href="/dashboard?page=profile"
                passHref
              >
                <a>Edit your profile</a>
              </Link>
            </li>
          </ul>
          <p>
            To return to TravelFeed and discover other travel blogs, you can
            always click on your profile icon on the top right and select
            &quot;TravelFeed&quot; to{" "}
            <Link href="/" passHref>
              <a>return to the feed.</a>
            </Link>
          </p>
        </CardContent>
      </Card>
    );
  }
}

WelcomeCard.propTypes = {
  user: PropTypes.string
};

export default WelcomeCard;
