/* eslint-disable react/no-unescaped-entities */
import React, { Fragment, Component } from "react";
import Header from "../components/Header";
import Helmet from "react-helmet";
import DEFAULT_META_DESCRIPTION from "../config";

class Join extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{"Join TravelFeed: The Travel Community"}</title>
          <meta property="description" content={DEFAULT_META_DESCRIPTION} />
          <meta property="og:description" content={DEFAULT_META_DESCRIPTION} />
        </Helmet>
        <Header />
        <div
          style={{
            backgroundImage: `url(/img/header-1.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            width: "100%",
            height: "500px"
          }}
        >
          <div className="container text-center h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-6">
                <h1 className="display-4">Join TravelFeed</h1>
                <p className="lead">
                  On TravelFeed, you can discover great travel content by
                  hundreds of likeminded travellers! If you want to start
                  blogging yourself, we also offer you a free Blog hosted on the
                  uncensorable Steem Blockchain.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="jumbotron mb-0">
          <div className="container text-center">
            <h1 className="display-4">The Travel Community</h1>
            <p className="lead">
              With almost 700 members, TravelFeed is the largest travel
              community on Steem.
            </p>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(/img/header-2.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            width: "100%",
            height: "500px"
          }}
        >
          <div className="container text-center h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-6">
                <h1 className="display-4">Get Rewarded</h1>
                <p className="lead">
                  When readers like your post, they will hit the 'take off'
                  button and assign miles to it. After seven days, you can claim
                  the reward for your post in cryptocurrency.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="jumbotron mb-0 text-center">
          <div className="container">
            <h1 className="display-4">Get Paid for Travelling</h1>
            <p className="lead">
              With TravelFeed, the dream of earning an online income becomes
              reality!
            </p>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(/img/header-3.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center right",
            backgroundSize: "cover",
            width: "100%",
            height: "500px"
          }}
        >
          <div className="container text-center h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-6">
                <h1 className="display-4">Join the Community!</h1>
                <p className="lead">
                  Join our TravelFeed Discord server to become part of the
                  TravelFeed community! We will set you up with a free Steem
                  account so you can start using TravelFeed!
                </p>
                <a
                  href="https://discord.gg/jWWu73H"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <button type="button" className="btn btn-dark p-0">
                    <img src="https://steemitimages.com/p/W5LtFUPm6g7111bbdcuxu3bfUg5qaCq8seb5paCtrrT7zRPoGe552cdWYfHncQ1zPiqJPpjCfugUd3kWR9WUPoKBapvwoByQRAMtpbeAP3NuYCEVhYZ7KCHoyq2a3DW2WePCNz1BWJYpJYFVje28C6FyBYUmk?format=match&mode=fit&width=130" />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Join;
