var express = require("express");
var router = express.Router();
// var passportFacebook = require('../auth/facebook');
// var passportTwitter = require('../auth/twitter');
var passportGoogle = require("../auth/google");
// var passportGitHub = require('../auth/github');

/* LOGIN ROUTER */
router.get("/login", function(req, res, next) {
  res.render("login", { title: "Please Sign In with:" });
});

/* LOGOUT ROUTER */
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

/* GOOGLE ROUTER */
router.get(
  "/google",
  passportGoogle.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"]
  })
);

router.get(
  "/google/callback",
  passportGoogle.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    res.send("booya");
    //res.redirect("/");
  }
);

module.exports = router;
