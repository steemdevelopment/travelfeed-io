import ReactPiwik from "react-piwik";

const Matomo = new ReactPiwik({
  url: "https://matomo.travelfeed.io",
  siteId: 1,
  trackErrors: true,
  jsFilename: "matomo.js",
  phpFilename: "matomo.php"
});

export default Matomo;
