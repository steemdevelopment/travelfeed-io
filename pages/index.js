//https://codepen.io/ncerminara/pen/eKNROb
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import PostGrid from "../components/PostGrid";
import Header from "../components/Header";
import Head from "../components/Head";
import HomeOrderBySelect from "../components/Grid/HomeOrderBySelect";
import { getUser } from "../utils/token";
// import FrontPageHeader from "../components/FrontPageHeader";
import BlogGridList from "../components/Sidebar/BlogGridList";
import LegalNotice from "../components/Sidebar/LegalNotice";
import NavSide from "../components/Sidebar/NavSide";
import JoinNow from "../components/Sidebar/JoinNow";
import StickyBox from "react-sticky-box";
import dynamic from "next/dynamic";

class Tag extends Component {
  state = {
    user: undefined,
    position: "absolute",
    marginTop: "-500px"
  };
  static async getInitialProps(props) {
    let { orderby } = props.query;
    let min_curation_score = 0;
    let selection = 0;
    let title = "TravelFeed";
    let isFeed = false;
    if (orderby === "created_at") {
      selection = 0;
      min_curation_score = 0;
      title = "Created";
      isFeed = false;
    } else if (orderby === "sc_hot") {
      selection = 1;
      min_curation_score = 0;
      title = "Taking Off";
      isFeed = false;
    } else if (orderby === "random") {
      selection = 2;
      min_curation_score = 10000;
      title = "Discover";
      isFeed = false;
    } else if (orderby === "feed") {
      selection = 4;
      orderby = "created_at";
      min_curation_score = 0;
      title = "Feed";
      isFeed = true;
    } else {
      //featured
      orderby = "created_at";
      selection = 3;
      min_curation_score = 10000;
      title = "Featured";
      isFeed = false;
    }
    return {
      orderby,
      min_curation_score,
      selection,
      title,
      isFeed
    };
  }
  componentDidMount() {
    this.setState({
      user: getUser()
    });
  }
  render() {
    const DiscoverCountry = dynamic(
      () => import("../components/Sidebar/DiscoverCountry"),
      {
        ssr: false
      }
    );
    return (
      <Fragment>
        <Head
          title={this.props.title + " - TravelFeed: The Travel Community"}
          description={`Discover the best travel content on TravelFeed, the world-wide travel community!`}
        />
        <Header />
        {
          //   this.props.title === "Featured" && this.state.user == null && (
          //   <FrontPageHeader />
          // )
        }
        <HomeOrderBySelect
          selection={this.props.selection}
          showFeed={this.state.user}
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-lg-1 d-xl-block d-lg-block d-none">
              <StickyBox offsetTop={65} offsetBottom={10}>
                <div className="d-none d-xl-block">
                  {this.state.user && <NavSide user={this.state.user} />}
                  {!this.state.user && <JoinNow />}
                </div>
              </StickyBox>
            </div>
            <div className="col-xl-6 col-lg-7 col-md-8 col-sm-12 p-0">
              <PostGrid
                query={{
                  orderby: this.props.orderby,
                  min_curation_score: this.props.min_curation_score,
                  limit: 8,
                  feed: this.props.isFeed ? this.state.user : undefined,
                  exclude_authors: ["travelfeed", "steemitworldmap"]
                }}
                grid={{ lg: 12, md: 12, sm: 12, xs: 12 }}
                cardHeight={350}
                poststyle="grid"
              />
            </div>
            <div className="col-xl-3 col-lg-4 col-md-4 d-none d-xl-block d-lg-block d-md-block">
              <StickyBox offsetTop={65} offsetBottom={10}>
                <div className="pt-3" />
                <BlogGridList />
                <div className="pt-3" />
                <DiscoverCountry />
                <div className="pt-2" />
                <LegalNotice />
              </StickyBox>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

Tag.propTypes = {
  tags: PropTypes.string,
  title: PropTypes.string,
  orderby: PropTypes.string,
  min_curation_score: PropTypes.number,
  selection: PropTypes.number,
  isFeed: PropTypes.bool
};

export default Tag;
