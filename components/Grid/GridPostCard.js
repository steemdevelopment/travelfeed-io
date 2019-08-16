import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import LazyLoad from 'vanilla-lazyload';
import { imageProxy } from '../../helpers/getImage';
import Link from '../../lib/Link';
import IsCurated from '../Post/IsCurated';
import SubHeader from '../Post/SubHeader';
import VoteSlider from '../Post/VoteSlider';

class GridPostCard extends Component {
  constructor(props) {
    super(props);
    this.myInput = React.createRef();
  }

  state = { show: true, cardWidth: 800 };

  componentDidMount() {
    if (this.myInput.current) {
      const cardWidth = Math.ceil(this.myInput.current.offsetWidth / 100) * 100;
      this.setState({ cardWidth });
    }
    if (!document.lazyLoadInstance) {
      document.lazyLoadInstance = new LazyLoad({
        elements_selector: '.lazy',
        threshold: 1200,
      });
    }
    document.lazyLoadInstance.update();
  }

  // Update lazyLoad after rerendering of every image
  componentDidUpdate() {
    document.lazyLoadInstance.update();
  }

  hide = () => {
    this.setState({ show: false });
  };

  render() {
    // Prevent SSR
    const BookmarkIcon = dynamic(() => import('../Post/BookmarkIcon'), {
      ssr: false,
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
          onBmChange={this.hide}
        />
      );
    } else {
      let appIcon = <Fragment />;
      if (
        this.props.post.app &&
        this.props.post.app.split('/')[0] === 'travelfeed'
      ) {
        appIcon = (
          <img
            width="25"
            alt="TravelFeed"
            className="mr-1"
            src="https://travelfeed.io/favicon.ico"
          />
        );
      }
      action = (
        <Fragment>
          {appIcon}
          <IsCurated curation_score={this.props.post.curation_score} />
        </Fragment>
      );
    }
    return (
      <Card key={this.props.post.permlink} className="m-2">
        <CardHeader
          avatar={
            <Link
              color="textPrimary"
              as={`/@${this.props.post.author}`}
              href={`/blog?author=${this.props.post.author}`}
              passHref
            >
              <a>
                <Avatar
                  style={{ cursor: 'pointer' }}
                  src={`https://steemitimages.com/u/${this.props.post.author}/avatar/small`}
                  alt={this.props.post.author}
                />
              </a>
            </Link>
          }
          action={<Fragment>{action}</Fragment>}
          title={
            <Link
              color="textPrimary"
              as={`/@${this.props.post.author}`}
              href={`/blog?author=${this.props.post.author}`}
              passHref
            >
              <a className="textPrimary cpointer">
                <strong>{this.props.post.display_name}</strong>
                <Typography
                  color="textSecondary"
                  variant="subtitle"
                  display="inline"
                >
                  {' '}
                  @{this.props.post.author}
                </Typography>
              </a>
            </Link>
          }
          subheader={
            <SubHeader
              created_at={this.props.post.created_at}
              readtime={this.props.post.readtime}
              location={{
                country_code: this.props.post.country_code,
                subdivision: this.props.post.subdivision,
              }}
            />
          }
        />
        <Link
          color="textPrimary"
          as={`/@${this.props.post.author}/${this.props.post.permlink}`}
          href={`/post?author=${this.props.post.author}&permlink=${this.props.post.permlink}`}
          passHref
        >
          <a>
            <CardActionArea>
              {this.props.post.img_url !== undefined &&
                this.props.post.img_url !== '' && (
                  <picture ref={this.myInput} className="lazyImage">
                    <source
                      className="lazyImage"
                      height={this.props.cardHeight}
                      type="image/webp"
                      data-srcset={`${imageProxy(
                        this.props.post.img_url,
                        this.state.cardWidth,
                        this.props.cardHeight,
                        undefined,
                        'webp',
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
                        'fit',
                      )}`}
                      data-src={`${imageProxy(
                        this.props.post.img_url,
                        this.state.cardWidth,
                        this.props.cardHeight,
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
        />{' '}
      </Card>
    );
  }
}

GridPostCard.defaultProps = {
  showBookmark: false,
  isBookmark: false,
};

GridPostCard.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  cardHeight: PropTypes.number.isRequired,
  showBookmark: PropTypes.bool,
  isBookmark: PropTypes.bool,
};

export default GridPostCard;
