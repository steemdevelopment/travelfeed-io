import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import NewIcon from "@material-ui/icons/Restore";
import FeaturedIcon from "@material-ui/icons/Star";
import HotIcon from "@material-ui/icons/FlightTakeoff";
import FeedIcon from "@material-ui/icons/Favorite";
import DiscoverIcon from "@material-ui/icons/Explore";

class IconLabelTabs extends React.Component {
  render() {
    return (
      <Paper square>
        <Tabs
          value={this.props.selection}
          onChange={this.handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          centered
        >
          <Tab
            icon={<NewIcon />}
            label="NEW"
            onClick={() =>
              this.props.handleClick({
                orderby: "created_at",
                min_curation_score: 0,
                url: "created",
                selection: 0,
                isFeed: false,
                hasChanged: true
              })
            }
          />
          <Tab
            icon={<HotIcon />}
            label="TAKING OFF"
            onClick={() =>
              this.props.handleClick({
                orderby: "sc_hot",
                min_curation_score: 0,
                url: "hot",
                selection: 1,
                isFeed: false,
                hasChanged: true
              })
            }
          />
          <Tab
            icon={<DiscoverIcon />}
            label="DISCOVER"
            onClick={() =>
              this.props.handleClick({
                orderby: "random",
                min_curation_score: 10000,
                url: "discover",
                selection: 2,
                isFeed: false,
                hasChanged: true
              })
            }
          />
          <Tab
            icon={<FeaturedIcon />}
            label="FEATURED"
            onClick={() =>
              this.props.handleClick({
                orderby: "created_at",
                min_curation_score: 10000,
                url: "featured",
                selection: 3,
                isFeed: false,
                hasChanged: true
              })
            }
          />
          {this.props.showFeed && (
            <Tab
              icon={<FeedIcon />}
              label="FEED"
              onClick={() =>
                this.props.handleClick({
                  orderby: "created_at",
                  min_curation_score: 0,
                  url: "feed",
                  selection: 4,
                  isFeed: true,
                  hasChanged: true
                })
              }
            />
          )}
        </Tabs>
      </Paper>
    );
  }
}

IconLabelTabs.propTypes = {
  showFeed: PropTypes.bool,
  handleClick: PropTypes.func
};

export default IconLabelTabs;

// class IconLabelTabs extends React.Component {
//   state = {
//     value: 2
//   };
//   handleChange = (event, value) => {
//     this.setState({ value });
//   };
//   //   componentDidMount() {
//   //     //   set to feed if logged in
//   //     this.setState({ value: 3 });
//   //   }
//   getInitialState() {}
//   render() {
//     let feed = <Fragment />;
//     if (this.props.showFeed !== undefined) {
//       feed = (
//         <Tab
//           icon={<FeedIcon />}
//           label="FEED"
//           onClick={() =>
//             this.props.handleClick({
//               min_curation_score: 0,
//               tags: undefined,
//               feed: "jpphotography",
//               orderby: "created_at",
//               url: "feed"
//             })
//           }
//         />
//       );
//     }
//     return (
//       <Paper square>
//         <Tabs
//           value={this.state.value}
//           onChange={this.handleChange}
//           variant="fullWidth"
//           indicatorColor="secondary"
//           textColor="secondary"
//           centered
//         >
//           <Tab
//             icon={<RecentIcon />}
//             label="NEW"
//             onClick={() =>
//               this.props.handleClick({
//                 orderby: "created_at",
//                 min_curation_score: 0,
//                 url: "created",
//                 feed: undefined,
//                 tags: "travelfeed"
//               })
//             }
//           />
//           <Tab
//             icon={<HotIcon />}
//             label="TAKING OFF"
//             onClick={() =>
//               this.props.handleClick({
//                 orderby: "sc_hot",
//                 min_curation_score: 0,
//                 url: "hot",
//                 feed: undefined,
//                 tags: "travelfeed"
//               })
//             }
//           />
//           <Tab
//             icon={<DiscoverIcon />}
//             label="Discover"
//             onClick={() =>
//               this.props.handleClick({
//                 orderby: "random",
//                 min_curation_score: 10000,
//                 url: "random",
//                 feed: undefined,
//                 tags: "travelfeed"
//               })
//             }
//           />
//           <Tab
//             icon={<FeaturedIcon />}
//             label="FEATURED"
//             onClick={() =>
//               this.props.handleClick({
//                 orderby: "created_at",
//                 min_curation_score: 10000,
//                 url: "featured",
//                 feed: undefined,
//                 tags: "travelfeed"
//               })
//             }
//           />
//           {feed}
//         </Tabs>
//       </Paper>
//     );
//   }
// }
