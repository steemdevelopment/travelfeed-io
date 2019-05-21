const express = require("express");
const next = require("next");
const compression = require("compression");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const handleNextRequests = app.getRequestHandler();

// https://gist.github.com/henrik/1688572
const euCountries = [
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "GB",
  "GF",
  "GP",
  "MQ",
  "ME",
  "YT",
  "RE",
  "MF",
  "GI",
  "AX",
  "PM",
  "GL",
  "BL",
  "SX",
  "AW",
  "CW",
  "WF",
  "PF",
  "NC",
  "TF",
  "AI",
  "BM",
  "IO",
  "VG",
  "KY",
  "FK",
  "MS",
  "PN",
  "SH",
  "GS",
  "TC",
  "AD",
  "LI",
  "MC",
  "SM",
  "VA",
  "JE",
  "GG",
  "GI",
  "IM"
];

const handle = (req, res) => {
  // Check country code of user IP as supplied by Cloudflare
  const country_code = req.header("CF-IPCountry");
  // Set session cookie for cookie consent for non-EU users to not annoy them with a cookie consent popup that is nor legally required for their country
  if (!(country_code in euCountries)) res.cookie("cookie_consent", true);
  handleNextRequests(req, res);
};

const port = process.env.PORT || 3000;

app
  .prepare()
  .then(() => {
    const server = express();
    // https://github.com/zeit/next.js/wiki/Getting-ready-for-production
    server.use(compression());

    server.use(express.static("public"));

    server.get("/@:author/:permlink", (req, res) => {
      const actualPage = "/post";
      const queryParams = {
        author: req.params.author,
        permlink: req.params.permlink
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/:tag/@:author/:permlink", (req, res) => {
      const author = req.params.author;
      const permlink = req.params.permlink;
      res.redirect(`/@${author}/${permlink}`);
    });

    server.get("/featured", (req, res) => {
      const actualPage = "/";
      const queryParams = {
        orderby: "featured"
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/feed", (req, res) => {
      const actualPage = "/";
      const queryParams = {
        orderby: "feed"
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/discover", (req, res) => {
      const actualPage = "/";
      const queryParams = {
        orderby: "random"
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/created", (req, res) => {
      const actualPage = "/";
      const queryParams = {
        orderby: "created_at"
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/hot", (req, res) => {
      const actualPage = "/";
      const queryParams = {
        orderby: "sc_hot"
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/created/:tag", (req, res) => {
      const tag = req.params.tag;
      res.redirect(`/hot/${tag}`);
    });

    server.get("/trending/:tag", (req, res) => {
      const tag = req.params.tag;
      res.redirect(`/favorites/${tag}`);
    });

    server.get("/hot/:tag", (req, res) => {
      const actualPage = "/tag";
      const queryParams = {
        orderby: "sc_hot",
        tags: req.params.tag
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/favorites/:tag", (req, res) => {
      const actualPage = "/tag";
      const queryParams = {
        orderby: "total_votes",
        tags: req.params.tag
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/featured/:tag", (req, res) => {
      const actualPage = "/tag";
      const queryParams = {
        orderby: "featured",
        tags: req.params.tag
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/destinations/:country", (req, res) => {
      const actualPage = "/destinations";
      const queryParams = {
        country: req.params.country
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/destinations/:country/:subdivision", (req, res) => {
      const actualPage = "/destinations";
      const queryParams = {
        country: req.params.country,
        subdivision: req.params.subdivision
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/destinations/:country/:subdivision/:city", (req, res) => {
      const actualPage = "/destinations";
      const queryParams = {
        country: req.params.country,
        subdivision: req.params.subdivision,
        city: req.params.city
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get(
      "/destinations/:country/:subdivision/:city/:suburb",
      (req, res) => {
        const actualPage = "/destinations";
        const queryParams = {
          country: req.params.country,
          subdivision: req.params.subdivision,
          city: req.params.city,
          suburb: req.params.suburb
        };
        app.render(req, res, actualPage, queryParams);
      }
    );

    server.get("/blog", (req, res) => {
      const actualPage = "/blog";
      const queryParams = {
        author: "travelfeed"
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/@:author", (req, res) => {
      const actualPage = "/blog";
      const queryParams = {
        author: req.params.author
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`Listening on Port ${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
