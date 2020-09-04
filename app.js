const dotenv = require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var async = require("async");
var router = express.Router();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// HERE
// IS
// THE
// WAY
// ?
// https://www.youtube.com/watch?v=wcUdBgktd4s

var bodyParser = require("body-parser");
var cors = require("cors");
var passport = require("passport");
var pg = require("passport-github2");
var Strategy = pg.Strategy;

let session = require("express-session");

// 1 passport gets git login
// 2 git info is saved to a user for my sight (tokens etc.)
// 3 use said tokens to query api for commit history

// graphql to pull user data https://medium.com/@wangyonglin1999/how-to-use-githubs-graphql-api-with-express-js-efd927aa9edc
// environmental vars to keep things secret https://medium.com/codait/environment-variables-or-keeping-your-secrets-secret-in-a-node-js-app-99019dfff716

// Client ID
//     163f60273a1723c1dc1b
// Client Secret
//     1155d3dba48d06dd847b9768a3df09fd2598e1bf

/** passport setup */
passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, user, cb) {
      console.log(accessToken);
      return cb(null, user);
    }
  )
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

// cors and bodyParser
app.use(cors());
app.use(
  bodyParser.json({
    limit: "50mb"
  })
);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// passport middleware
app.use(
  session({
    secret: "s3cre3t",
    resave: true,
    saveUnitiialized: true
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

app.get("/", function(req, res, next) {
  res.render("index");
});

app.get("/account", isAuthenticated, (req, res) => {
  console.log("user", req.user);
  res.render("success", { user: req.user.username });
});

app.get(
  "/auth/github",
  passport.authenticate("github", {
    scope: ["user:email"],
    successRedirect: "/account",
    failureRedirect: "/",
    session: false
  })
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

module.exports = app;
