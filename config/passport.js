const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const Keys = require('./keys');
const User = require('../module/user');
const { Mongoose } = require('mongoose');

passport.serializeUser((user,done)=>{
    done(null,user._id)
});
passport.deserializeUser((_id,done)=>{
User.findById(_id).then(user)
    done(null,user._id)
})

passport.use(
    new GoogleStrategy({
        // option for the google start
        callbackUrl: '/auth/google/redirect',
        clientID: Keys.google.clientID,
        clientSecret: Keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        User.findOne({ googleID: profile.id }).then((currentUser) => {
            if (currentUser) {
                console.log('user is:', currentUser);
                done(null,currentUser);
            } else {
                // console.log('passport callback function fired')
                // console.log('profile');
                new User({
                    _id: new mongoose.Types.ObjectId(),
                    userName: profile.displayName,
                    googleID: profile.id,
                    thumbnail:profile.json
                }).save().then((newUser) => {
                    console.log('new user created:' + newUser);
                    done(null,newUser);
                })
            }
        })



    })
)
