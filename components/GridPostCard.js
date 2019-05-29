import React, { Fragment, Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import VoteSlider from "./VoteSlider";
import PropTypes from "prop-types";
import IsCurated from "./IsCurated";
import SubHeader from "./Post/SubHeader";
import LocationIcon from "@material-ui/icons/LocationOn";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { nameFromCC, slugFromCC } from "../helpers/country_codes";
import dynamic from "next/dynamic";
import { imageProxy } from "../helpers/getImage";
import LazyLoad from "vanilla-lazyload";

class PostCard extends Component {
  constructor(props) {
    super(props);
    this.myInput = React.createRef();
  }
  state = { show: true, cardWidth: 800 };
  hide() {
    this.setState({ show: false });
  }
  componentDidMount() {
    if (this.myInput.current) {
      const cardWidth =
        Math.round(this.myInput.current.offsetWidth / 100) * 100;
      this.setState({ cardWidth });
    }
    if (!document.lazyLoadInstance) {
      document.lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy",
        threshold: 1500
      });
    }
    document.lazyLoadInstance.update();
  }
  // Update lazyLoad after rerendering of every image
  componentDidUpdate() {
    document.lazyLoadInstance.update();
  }
  render() {
    // Prevent SSR
    const BookmarkIcon = dynamic(() => import("./Post/BookmarkIcon"), {
      ssr: false
    });
    // Hide if deleted (for bookmarks)
    if (!this.state.show) {
      return <Fragment />;
    }
    let action = <Fragment />;
    if (this.props.showBookmark === true) {
      action = (
        <BookmarkIcon
          author={this.props.post.author}
          permlink={this.props.post.permlink}
        />
      );
    } else if (this.props.isBookmark === true) {
      action = (
        <BookmarkIcon
          author={this.props.post.author}
          permlink={this.props.post.permlink}
          onBmChange={this.hide.bind(this)}
        />
      );
    } else {
      let appIcon = <Fragment />;
      if (this.props.post.app.split("/")[0] === "travelfeed") {
        appIcon = (
          <img
            width="25"
            className="mr-1"
            src="https://travelfeed.io/favicon.ico"
          />
        );
      }
      const country =
        this.props.post.country_code !== null
          ? nameFromCC(this.props.post.country_code)
          : undefined;
      const countryslug =
        this.props.post.country_code !== null
          ? slugFromCC(this.props.post.country_code)
          : undefined;
      action = (
        <Fragment>
          {appIcon}
          {country && (
            <Link
              as={`/destinations/${countryslug}/${
                this.props.post.subdivision !== null
                  ? this.props.post.subdivision
                  : ""
              }/`}
              href={`/destinations?country=${countryslug}${
                this.props.post.subdivision !== null
                  ? "&subdivision=" + this.props.post.subdivision
                  : ""
              }`}
              passHref
            >
              <Tooltip
                title={`${
                  this.props.post.subdivision !== null
                    ? this.props.post.subdivision + ", "
                    : ""
                } ${country}`}
                placement="bottom"
              >
                <IconButton>
                  <LocationIcon />
                </IconButton>
              </Tooltip>
            </Link>
          )}
          <IsCurated curation_score={this.props.post.curation_score} />
        </Fragment>
      );
    }
    return (
      <Card key={this.props.post.permlink} className="m-2">
        <CardHeader
          avatar={
            <Link
              as={`/@${this.props.post.author}`}
              href={`/blog?author=${this.props.post.author}`}
              passHref
            >
              <a>
                <Avatar
                  style={{ cursor: "pointer" }}
                  src={`https://steemitimages.com/u/${
                    this.props.post.author
                  }/avatar/small`}
                  alt={this.props.post.author}
                />
              </a>
            </Link>
          }
          action={<Fragment>{action}</Fragment>}
          title={
            <Link
              as={`/@${this.props.post.author}`}
              href={`/blog?author=${this.props.post.author}`}
              passHref
            >
              <a className="text-dark cpointer">
                <strong>{this.props.post.display_name}</strong>
                <span className="text-muted"> @{this.props.post.author}</span>
              </a>
            </Link>
          }
          subheader={
            <SubHeader
              created_at={this.props.post.created_at}
              readtime={this.props.post.readtime}
            />
          }
        />
        <Link
          as={`/@${this.props.post.author}/${this.props.post.permlink}`}
          href={`/post?author=${this.props.post.author}&permlink=${
            this.props.post.permlink
          }`}
          passHref
        >
          <a>
            <CardActionArea>
              {this.props.post.img_url !== undefined &&
                this.props.post.img_url !== "" && (
                  <picture ref={this.myInput} className="lazyImage">
                    <source
                      className="lazyImage"
                      height={this.props.cardHeight}
                      type="image/webp"
                      data-srcset={`${imageProxy(
                        this.props.post.img_url,
                        this.state.cardWidth * 1.2,
                        this.props.cardHeight * 1.2,
                        undefined,
                        "webp"
                      )}`}
                      data-sizes="100w"
                    />
                    <img
                      height={this.props.cardHeight}
                      width="100%"
                      alt={this.props.post.title}
                      className="lazy"
                      src={`${imageProxy(
                        this.props.post.img_url,
                        10,
                        10,
                        "fit"
                      )}`}
                      data-src={`${imageProxy(
                        this.props.post.img_url,
                        this.state.cardWidth * 1.2,
                        this.props.cardHeight * 1.2
                      )}`}
                      data-sizes="100w"
                    />
                  </picture>
                )}
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {this.props.post.title}
                </Typography>
                <Typography component="p">
                  {this.props.post.excerpt} [...]
                </Typography>
              </CardContent>
            </CardActionArea>
          </a>
        </Link>
        <VoteSlider
          author={this.props.post.author}
          permlink={this.props.post.permlink}
          votes={this.props.post.votes}
          total_votes={this.props.post.total_votes}
          tags={this.props.post.tags}
          mode="gridcard"
          depth={this.props.post.depth}
        />{" "}
      </Card>
    );
  }
}

PostCard.default = {
  showBookmark: false,
  isBookmark: false
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  cardHeight: PropTypes.number,
  showBookmark: PropTypes.bool,
  isBookmark: PropTypes.bool
};

export default PostCard;
