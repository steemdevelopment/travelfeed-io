/* eslint-disable react/no-unescaped-entities */
import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from "reactstrap";

const items = [
  {
    src: "/img/header-1.jpg",
    caption: (
      <div className="carousel-caption text-light text-dark pb-5">
        <h1>TravelFeed: The Travel Community.</h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <p>
              On TravelFeed, you can discover great travel content by hundreds
              of independent travellers like yourself!
            </p>
          </div>
        </div>
        <p>
          <a href="#discover">
            <Button color="secondary" variant="contained">
              Discover Now
            </Button>
          </a>
        </p>
      </div>
    ),
    backgroundPosition: "center center"
  },
  {
    src: "/img/header-2.jpg",
    caption: (
      <div className="carousel-caption text-dark pb-5">
        <h1>Share your Story.</h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <p>
              We all have stories to share. This is why we offer you a free Blog
              hosted on the uncensorable Steem Blockchain and accessible ad-free
              through your own subdomain.
            </p>
          </div>
        </div>
        <p>
          <Link href="/join" passHref>
            <a>
              <Button color="primary" variant="outlined">
                Learn more
              </Button>
            </a>
          </Link>
        </p>
      </div>
    ),
    backgroundPosition: "center center"
  },
  {
    src: "/img/header-3.jpg",
    caption: (
      <div className="carousel-caption text-right text-dark pb-5">
        <h1>Get paid for blogging.</h1>
        <div className="row">
          <div className="col-md-6" />
          <div className="col-md-6 text-right">
            <p>
              When readers like your post, they will hit the 'take off' button
              and assign miles to it. After seven days, you can claim the reward
              for your post in cryptocurrency.
            </p>
          </div>
        </div>
        <p>
          <Link href="/join" passHref>
            <a>
              <Button color="inherit" variant="outlined">
                Join the Community
              </Button>
            </a>
          </Link>
        </p>
      </div>
    ),
    backgroundPosition: "center right"
  }
];

class FrontPageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  render() {
    const { activeIndex } = this.state;

    const slides = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <div
            style={{
              backgroundImage: `url(${item.src})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: item.backgroundPosition,
              backgroundSize: "cover",
              width: "100%",
              height: "500px"
            }}
          />
          <div className="container">{item.caption}</div>
        </CarouselItem>
      );
    });
    return (
      <Fragment>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
          slide={false}
        >
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={this.goToIndex}
          />
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={this.previous}
            className="cpointer"
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={this.next}
            className="cpointer"
          />
        </Carousel>
      </Fragment>
    );
  }
}

export default FrontPageHeader;
