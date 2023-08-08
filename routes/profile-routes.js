const router = require('express').Router();


// function/middleware to check user logged in or not
const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    } else{
        next()
    }
}

router.get('/', authCheck, (req, res) => {
    // res.send('you are logged in,this is your profile-' + req.user.userName)
    res.render('profile',{user:req.user});
});
module.exports = router;