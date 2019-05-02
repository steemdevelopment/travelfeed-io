//https://codepen.io/ncerminara/pen/eKNROb
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import PostGrid from "../components/PostGrid";
import Header from "../components/Header";
import Head from "../components/Head";
import HomeOrderBySelect from "../components/Grid/HomeOrderBySelect";
import { getUser } from "../utils/token";
import FrontPageHeader from "../components/FrontPageHeader";
import BlogGridList from "../components/Sidebar/BlogGridList";
import LegalNotice from "../components/Sidebar/LegalNotice";
import NavSide from "../components/Sidebar/NavSide";
import JoinNow from "../components/Sidebar/JoinNow";

class Tag extends Component {
  state = {
    user: undefined
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
    return (
      <Fragment>
        <Head
          title={this.props.title + " - TravelFeed: The Travel Community"}
          description={`Discover the best travel content on TravelFeed, the world-wide travel community!`}
        />
        {this.state.user == null && (
          <div style={{ marginTop: "-10px" }}>
            <FrontPageHeader />
          </div>
        )}
        <HomeOrderBySelect
          selection={this.props.selection}
          showFeed={this.state.user}
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-lg-1 d-xl-block d-lg-block d-none">
              <div className="sidebar-item">
                <div className="make-me-sticky">
                  <div className="d-none d-xl-block">
                    {this.state.user && <NavSide user={this.state.user} />}
                    {!this.state.user && <JoinNow />}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-7 col-md-8 col-sm-12 p-0">
              <PostGrid
                className="content-section"
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
              <div className="sidebar-item">
                <div className="make-me-sticky">
                  <BlogGridList />
                  <LegalNotice />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Header />
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

// import React, { Fragment, Component } from "react";
// import FrontPageHeader from "../components/FrontPageHeader";
// import PostGrid from "../components/PostGrid";
// import Helmet from "react-helmet";
// import Header from "../components/Header";
// import { getUser } from "../utils/token";
// import { DEFAULT_META_DESCRIPTION } from "../config";
// import HomeOrderBySelect from "../components/Grid/HomeOrderBySelect";
// import Grid from "@material-ui/core/Grid";

// class Index extends Component {
//   state = { user: null };
//   static async getInitialProps(props) {
//     let { orderby } = props.query;
//     const { tags } = props.query;
//     let min_curation_score = 0;
//     let title = tags;
//     let value = 0;
//     if (orderby === "created_at") {
//       value = 0;
//       min_curation_score = 0;
//     } else if (orderby === "sc_hot") {
//       value = 1;
//       min_curation_score = 0;
//     } else if (orderby === "featured") {
//       value = 2;
//       orderby = "created_at";
//       min_curation_score = 10000;
//     } else if (orderby === "total_votes") {
//       //favourites
//       title = "Favourites";
//       value = 3;
//       min_curation_score = 5000;
//     }
//     return {
//       orderby,
//       tags,
//       min_curation_score: min_curation_score,
//       title: title,
//       value: value
//     };
//   }
// setUser() {
//   this.setState({ user: getUser() });
// }
//   async componentDidMount() {
//     await this.setUser();
//     if (this.state.user !== undefined) {
//       this.setState({
//         min_curation_score: 0,
//         tags: undefined,
//         feed: this.state.user,
//         orderby: "created_at",
//         value: 3
//       });
//     }
//   }
//   state = {
//     value: 2,
//     min_curation_score: 0,
//     orderby: "created_at",
//     limit: 12
//   };
//   handleClick(op) {
//     this.setState(op);
//     if (op.url === "feed") {
//       window.history.pushState("", "", `/`);
//     } else {
//       window.history.pushState("", "", `/${op.url}`);
//     }
//   }
//   render() {
//     var slider = <Fragment />;
//     if (this.state.user == null) {
//       slider = (
//         <div style={{ marginTop: "-10px" }}>
//           <FrontPageHeader />
//         </div>
//       );
//     }

//     return (
//       <Fragment>
//         <Helmet>
//           <title>{"TravelFeed: The Travel Community"}</title>
//           <meta property="description" content={DEFAULT_META_DESCRIPTION} />
//           <meta property="og:description" content={DEFAULT_META_DESCRIPTION} />
//         </Helmet>
//         <Header />
//         {slider}
//         <HomeOrderBySelect
//           handleClick={this.handleClick.bind(this)}
//           selection={this.state}
//           value={this.state.value}
//           showFeed={this.state.user}
//         />
// <Grid
//   container
//   spacing={0}
//   alignItems="center"
//   justify="center"
//   className="p-3"
// >
//           <Grid item lg={3} md={2} sm={0} xs={0}>
//             <div className="bg-dark">adsdasd </div>
//           </Grid>
//           <Grid item lg={6} md={8} sm={12} xs={12}>
//             <PostGrid
//               query={this.state}
//               grid={{ lg: 12, md: 12, sm: 12, xs: 12 }}
//               cardHeight={350}
//             />{" "}
//           </Grid>
// <Grid item lg={3} md={2} sm={0} xs={0}>
//   <div className="bg-dark">adsdasd </div>
// </Grid>
//         </Grid>
//       </Fragment>
//     );
//   }
// }

// export default Index;
