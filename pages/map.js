import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import CookiePopup from '../components/CookieConsent/CookiePopup';
import Head from '../components/Header/Head';
import Header from '../components/Header/Header';
import Map from '../components/Maps/MapCluster';
import { GET_PLACES } from '../helpers/graphql/places';
import { hasCookieConsent } from '../helpers/token';

class About extends Component {
  state = {
    open: false,
    optin: false,
  };

  componentDidMount() {
    const cookie = hasCookieConsent() !== 'true';
    this.setState({ open: cookie, optin: !cookie });
  }

  decline() {
    this.setState({ open: false });
  }

  accept() {
    this.setState({ open: false, optin: true });
  }

  render() {
    const title = 'Map';
    return (
      <Fragment>
        <Header subheader={title} />
        <Head title={`${title} - TravelFeed: The Travel Community`} />
        <div
          style={{
            background: '#343332',
            position: 'absolute',
          }}
          className="w-100 h-100"
        >
          {
            // Fetches all posts with a location and a minimum upvote of 50%. Not-curated posts are not displayed since they are usually less relevant.
          }
          {(this.state.optin && (
            <Query query={GET_PLACES}>
              {({ data }) => {
                if (data && data.places) {
                  return <Map data={data && data.places} />;
                }
                return <Fragment />;
              }}
            </Query>
          )) || (
            <CookiePopup
              open={this.state.open}
              accept={this.accept.bind(this)}
              decline={this.decline.bind(this)}
              allowtext="Allow cookies once"
              content={
                <Typography variant="p" className="text-light">
                  The map requires cookies to load. You have not accepted
                  cookies yet, but you can allow cookies for loading the map.{' '}
                  <br />
                  We and our partners use cookies to improve your experience and
                  to analyze how our site is used.
                  <br />
                  <Link href="/about/cookies" passHref>
                    <a className="text-light text-decoration-underline">
                      Learn more
                    </a>
                  </Link>
                </Typography>
              }
            />
          )}
        </div>
      </Fragment>
    );
  }
}

export default About;
