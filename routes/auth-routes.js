const router = require('express').Router();
const passport = require('passport');

router.get('/login',(req,res)=>{
    res.render('login',{user:req.user});
});

// auth logout
router.get('/logout',(req,res)=>{
    // handle with passport
    // res.send('logging out');
    res.logout()
    res.redirect('/');
});

// auth with google
router.get('/google',passport.authenticate('google',{
    // used to retrive info 
    scope:['profile']
}));

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    // res.send(req.user);
    // res.send('you reached the callback URI');
     res.redirect('/profile/')
})

module.exports = router;