const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
      clientID:"982898104006-a10vrafas84vtgebhah9hohhj1g50rkl.apps.googleusercontent.com",
      clientSecret:"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",
      callbackURL: "/google/callback",
      passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
));

module.exports = passport;