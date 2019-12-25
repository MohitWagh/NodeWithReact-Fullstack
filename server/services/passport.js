const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose=require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

//https://console.developers.google.com
let googleStrategy = new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        new User({googleID: profile.id}).save();
    }
);

passport.use(googleStrategy.name, googleStrategy);