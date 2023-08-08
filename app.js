const express = require('express');
const mongoose = require('mongoose');
const Keys = require('./config/keys');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport');
const passport = require('passport');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const app = express();

// setup view engine
app.set('view engine','ejs');
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoDB.Url,{ useNewUrlParser: true,useUnifiedTopology: true },()=>{
    console.log ('connected')
});
mongoose.set('useCreateIndex', true);

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.session.cookieKey]
}))

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());


// setup routes
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

// setup routes
app.get('/',(req,res)=>{
    res.render('home',{user:req.user});
});


app.listen(3000,()=>{
    console.log('app now listening for request on port 3000')
})