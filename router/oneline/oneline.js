const express = require('express');
const router = express.Router();
const db = require('../../models');
const fs = require('fs')

const { OneLine } = db;     // db.OneLine
const { User } = db;        // db.User

router.use(express.urlencoded({ extended: false }));

router.get("/", async (req, res) => {
  fs.readFile("./static/index.html", function (err, data) {
    if (err) {
      res.send("에러");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
});

module.exports = router;