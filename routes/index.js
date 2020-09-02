var express = require("express");
var router = express.Router();
let bodyParser = require("body-parser");
let cors = require("cors");
let passport = require("passport");
let path = require("path");
let pg = require("passport-github2");
let Strategy = pg.Strategy;

let session = require("express-session");

/** passport setup */
passport.use(
  new Strategy(
    {
      clientID: "163f60273a1723c1dc1b",
      clientSecret: "1155d3dba48d06dd847b9768a3df09fd2598e1bf",
      callbackURL: "http://localhost:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, user, cb) {
      return cb(null, user);
    }
  )
);

// Client ID
//     163f60273a1723c1dc1b
// Client Secret
//     1155d3dba48d06dd847b9768a3df09fd2598e1bf

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

/** set app */

app.use(cors());
app.use(
  bodyParser.json({
    limit: "50mb"
  })
);

//passport middleware
app.use(
  session({
    secret: "s3cr3t",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + "/public"));

const isAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/account", isAuthenticated, (req, res) => {
  res.render("success", { user: req.user._json });
});

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: "/account",
    failureRedirect: "/"
  })
);

app.use("/auth/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.listen(3000);

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;

// Client ID
//     163f60273a1723c1dc1b
// Client Secret
//     1155d3dba48d06dd847b9768a3df09fd2598e1bf
