import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import Helmet from "react-helmet";

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
              <img
                className="first-slide"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                alt="First slide"
              />
              <div className="container">
                <div className="carousel-caption text-left">
                  <h1>Example headline.</h1>
                  <p>
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                    Donec id elit non mi porta gravida at eget metus. Nullam id
                    dolor id nibh ultricies vehicula ut id elit.
                  </p>
                  <p>
                    <a
                      className="btn btn-lg btn-primary"
                      href="#"
                      role="button"
                    >
                      Sign up today
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img
                className="second-slide"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                alt="Second slide"
              />
              <div className="container">
                <div className="carousel-caption">
                  <h1>Another example headline.</h1>
                  <p>
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                    Donec id elit non mi porta gravida at eget metus. Nullam id
                    dolor id nibh ultricies vehicula ut id elit.
                  </p>
                  <p>
                    <a
                      className="btn btn-lg btn-primary"
                      href="#"
                      role="button"
                    >
                      Learn more
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img
                className="third-slide"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                alt="Third slide"
              />
              <div className="container">
                <div className="carousel-caption text-right">
                  <h1>One more for good measure.</h1>
                  <p>
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                    Donec id elit non mi porta gravida at eget metus. Nullam id
                    dolor id nibh ultricies vehicula ut id elit.
                  </p>
                  <p>
                    <a
                      className="btn btn-lg btn-primary"
                      href="#"
                      role="button"
                    >
                      Browse gallery
                    </a>
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
