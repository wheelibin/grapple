var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "1051008101401-b0qetef9bbkocgsr9kab0dulrv2dr61f.apps.googleusercontent.com",
      clientSecret: "waexwEIXthsk_mFfJdgCmvcx",
      callbackURL: "http://127.0.0.1:5000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate(
        { userid: profile.id },
        { name: profile.displayName, userid: profile.id },
        (err, user) => {
          return done(err, user);
        }
      );
    }
  )
);

module.exports = passport;
