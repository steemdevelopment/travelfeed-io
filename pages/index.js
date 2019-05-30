// https://codepen.io/ncerminara/pen/eKNROb
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import StickyBox from 'react-sticky-box';
import HomeOrderBySelect from '../components/Grid/HomeOrderBySelect';
import PostGrid from '../components/Grid/PostGrid';
import Head from '../components/Header/Head';
import Header from '../components/Header/Header';
// import FrontPageHeader from "../components/FrontPageHeader";
import BlogGridList from '../components/Sidebar/BlogGridList';
import JoinNow from '../components/Sidebar/JoinNow';
import LegalNotice from '../components/Sidebar/LegalNotice';
import NavSide from '../components/Sidebar/NavSide';
import { getUser } from '../helpers/token';

class Tag extends Component {
  state = {
    user: undefined,
  };

  static async getInitialProps(props) {
    let { orderby } = props.query;
    let minCurationScore = 0;
    let selection = 0;
    let title = 'TravelFeed';
    let isFeed = false;
    if (orderby === 'created_at') {
      selection = 0;
      minCurationScore = 0;
      title = 'Created';
      isFeed = false;
    } else if (orderby === 'sc_hot') {
      selection = 1;
      minCurationScore = 0;
      title = 'Taking Off';
      isFeed = false;
    } else if (orderby === 'random') {
      selection = 2;
      minCurationScore = 10000;
      title = 'Discover';
      isFeed = false;
    } else if (orderby === 'feed') {
      selection = 4;
      orderby = 'created_at';
      minCurationScore = 0;
      title = 'Feed';
      isFeed = true;
    } else {
      // featured
      orderby = 'created_at';
      selection = 3;
      minCurationScore = 10000;
      title = 'Featured';
      isFeed = false;
    }
    return {
      orderby,
      minCurationScore,
      selection,
      title,
      isFeed,
    };
  }

  componentDidMount() {
    this.setState({
      user: getUser(),
    });
  }

  render() {
    const { title, selection, orderby, minCurationScore, isFeed } = this.props;
    const { user } = this.state;
    const DiscoverCountry = dynamic(
      () => import('../components/Sidebar/DiscoverCountry'),
      {
        ssr: false,
      },
    );
    return (
      <Fragment>
        <Head
          title={`${title} - TravelFeed: The Travel Community`}
          description="Discover the best travel content on TravelFeed, the world-wide travel community!"
        />
        <Header />
        <HomeOrderBySelect selection={selection} showFeed={user} />
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-lg-1 d-xl-block d-lg-block d-none">
              <StickyBox offsetTop={65} offsetBottom={10}>
                <div className="d-none d-xl-block">
                  {user && <NavSide user={user} />}
                  {!user && <JoinNow />}
                </div>
              </StickyBox>
            </div>
            <div className="col-xl-6 col-lg-7 col-md-8 col-sm-12 p-0">
              <PostGrid
                query={{
                  orderby,
                  minCurationScore,
                  limit: 8,
                  feed: isFeed ? user : undefined,
                  exclude_authors: ['travelfeed', 'steemitworldmap'],
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
  title: PropTypes.string.isRequired,
  orderby: PropTypes.string.isRequired,
  minCurationScore: PropTypes.number.isRequired,
  selection: PropTypes.number.isRequired,
  isFeed: PropTypes.bool.isRequired,
};

export default Tag;
