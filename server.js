const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

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

    server.get("/created/:tag", (req, res) => {
      const actualPage = "/tag";
      const queryParams = {
        sortby: "created",
        tag: req.params.tag
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/hot/:tag", (req, res) => {
      const actualPage = "/tag";
      const queryParams = {
        sortby: "hot",
        tag: req.params.tag
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/trending/:tag", (req, res) => {
      const actualPage = "/tag";
      const queryParams = {
        sortby: "trending",
        tag: req.params.tag
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/featured/travelfeed", (req, res) => {
      const actualPage = "/tag";
      const queryParams = {
        sortby: "featured",
        tag: "travelfeed"
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/blog", (req, res) => {
      const actualPage = "/blog";
      const queryParams = {
        author: "travelfeed"
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/@travelfeed", (req, res) => {
      res.redirect("/blog");
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

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
