/* eslint-disable react/no-unescaped-entities */
import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import Button from "@material-ui/core/Button";
import Helmet from "react-helmet";
import Link from "next/link";

class FrontPageHeader extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <script
            src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossOrigin="anonymous"
          />
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
            integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
            crossOrigin="anonymous"
          />
        </Helmet>
        <div
          id="myCarousel"
          className="carousel slide carousel-fade"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#myCarousel"
              data-slide-to="0"
              className="active"
            />
            <li data-target="#myCarousel" data-slide-to="1" />
            <li data-target="#myCarousel" data-slide-to="2" />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div
                className="first-slide"
                style={{
                  backgroundImage: "url(/img/header-1.jpg)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                  width: "100%",
                  height: "100%"
                }}
              />
              <div className="container">
                <div className="carousel-caption text-light text-dark">
                  <h1>TravelFeed: The Travel Community.</h1>
                  <div className="row justify-content-center">
                    <div className="col-md-6">
                      <p>
                        On TravelFeed, you can discover great travel content by
                        hundreds of independrend travellers like yourself!
                      </p>
                    </div>
                  </div>
                  <p>
                    <Link href="#discover">
                      <Button color="secondary" variant="contained">
                        Discover Now
                      </Button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div
                className="second-slide"
                style={{
                  backgroundImage: "url(/img/header-2.jpg)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                  width: "100%",
                  height: "100%"
                }}
              />
              <div className="container">
                <div className="carousel-caption text-dark">
                  <h1>Share your Story.</h1>
                  <div className="row justify-content-center">
                    <div className="col-md-6">
                      <p>
                        We all have stories to share. This is why we offer you a
                        free Blog hosted on the uncensorable Steem Blockchain
                        and accessible ad-free through your own subdomain.
                      </p>
                    </div>
                  </div>
                  <p>
                    <Link href="">
                      <Button color="primary" variant="outlined">
                        Learn more
                      </Button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div
                className="third-slide"
                style={{
                  backgroundImage: "url(/img/header-3.jpg)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center right",
                  backgroundSize: "cover",
                  width: "100%",
                  height: "100%"
                }}
              />
              <div className="container">
                <div className="carousel-caption text-right text-dark">
                  <h1>Get Rewarded.</h1>
                  <div className="row">
                    <div className="col-md-6" />
                    <div className="col-md-6 text-right">
                      <p>
                        When readers like your post, they will hit the 'take
                        off' button and assign miles to it. After seven days,
                        you can claim the reward for your post in
                        cryptocurrency.
                      </p>
                    </div>
                  </div>
                  <p>
                    <Button color="inherit" variant="outlined">
                      Join the Community
                    </Button>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#myCarousel"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#myCarousel"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
        <style jsx>{`
          /* GLOBAL STYLES
-------------------------------------------------- */
          /* Padding below the footer and lighter body text */

          body {
            padding-top: 3rem;
            padding-bottom: 3rem;
            color: #5a5a5a;
          }

          /* CUSTOMIZE THE CAROUSEL
-------------------------------------------------- */

          /* Carousel base class */
          .carousel {
            margin-bottom: 4rem;
          }
          /* Since positioning the image, we need to help out the caption */
          .carousel-caption {
            bottom: 3rem;
            z-index: 10;
          }

          /* Declare heights because of positioning of img element */
          .carousel-item {
            height: 32rem;
            background-color: #777;
          }
          .carousel-item > img {
            position: absolute;
            top: 0;
            left: 0;
            min-width: 100%;
            height: 32rem;
          }

          /* MARKETING CONTENT
-------------------------------------------------- */

          /* Center align the text within the three columns below the carousel */
          .marketing .col-lg-4 {
            margin-bottom: 1.5rem;
            text-align: center;
          }
          .marketing h2 {
            font-weight: 400;
          }
          .marketing .col-lg-4 p {
            margin-right: 0.75rem;
            margin-left: 0.75rem;
          }

          /* Featurettes
------------------------- */

          .featurette-divider {
            margin: 5rem 0; /* Space out the Bootstrap <hr> more */
          }

          /* Thin out the marketing headings */
          .featurette-heading {
            font-weight: 300;
            line-height: 1;
            letter-spacing: -0.05rem;
          }

          /* RESPONSIVE CSS
-------------------------------------------------- */

          @media (min-width: 40em) {
            /* Bump up size of carousel content */
            .carousel-caption p {
              margin-bottom: 1.25rem;
              font-size: 1.25rem;
              line-height: 1.4;
            }

            .featurette-heading {
              font-size: 50px;
            }
          }

          @media (min-width: 62em) {
            .featurette-heading {
              margin-top: 7rem;
            }
          }
        `}</style>
      </Fragment>
    );
  }
}

export default FrontPageHeader;
