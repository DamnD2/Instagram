const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const keys = require('../config/keys');
const User = mongoose.model('User');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretKey
}

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      const user = await User.findById(payload.id).select('email id');
      user ? done(null, user) : done(null, false);
    })
  );
};