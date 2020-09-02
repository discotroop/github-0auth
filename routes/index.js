var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;

// Client ID
//     163f60273a1723c1dc1b
// Client Secret
//     1155d3dba48d06dd847b9768a3df09fd2598e1bf
