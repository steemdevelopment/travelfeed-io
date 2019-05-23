import React, { Component, Fragment } from "react";

// pages/about.js
import { withAmp } from "next/amp";

const AboutPage = () => {
  return <h3>My AMP About Page!</h3>;
};

export default withAmp(AboutPage);
