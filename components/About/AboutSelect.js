import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AboutIcon from "@material-ui/icons/Info";
import TermsIcon from "@material-ui/icons/Toc";
import PrivacyIcon from "@material-ui/icons/Lock";
import CookieIcon from "@material-ui/icons/GroupWork";
import FAQIcon from "@material-ui/icons/QuestionAnswer";
import SupportIcon from "@material-ui/icons/Favorite";
import Link from "next/link";

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
          <Link href="/about/" passHref>
            <Tab icon={<AboutIcon />} label="ABOUT" />
          </Link>
          <Link href="/about/terms" passHref>
            <Tab icon={<TermsIcon />} label="TERMS" />
          </Link>
          <Link href="/about/privacy" passHref>
            <Tab icon={<PrivacyIcon />} label="PRIVACY" />
          </Link>
          <Link href="/about/cookies" passHref>
            <Tab icon={<CookieIcon />} label="COOKIES" />
          </Link>
          <Link href="/about/faq" passHref>
            <Tab icon={<FAQIcon />} label="FAQ" />
          </Link>
          <Link href="/about/support-us" passHref>
            <Tab icon={<SupportIcon />} label="SUPPORT US" />
          </Link>
        </Tabs>
      </Paper>
    );
  }
}

IconLabelTabs.propTypes = {
  selection: PropTypes.number
};

export default IconLabelTabs;
