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
