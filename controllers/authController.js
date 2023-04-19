const { postSignupModel, postLoginModel, } = require("../models/authModel")



// get signup page

const getSignup = (req, res) => {
    res.render("signup", {
        titleName: "signup",
        SignEmailValidation: req.flash("SignEmailValidation")[0],
        isUser : req.session.userId
    });
};
// post signup page
const postSignup = (req, res) => {
    postSignupModel(req.body.username, req.body.email, req.body.password)
    .then((result) => {
        res.redirect("/login");
    })
    .catch((err) => {
        res.redirect("/signup");
        req.flash("SignEmailValidation", err);
    });
};

//get login page
const getLogin = (req,res) => {
    res.render('login',{
        titleName : 'login',
        LoginEmailValidation : req.flash('LoginEmailValidation')[0],
        isUser : req.session.userId
    })
}

const postLogin = (req,res) => {
    postLoginModel(req.body.email, req.body.password).then((result) => {
        req.session.userId = result.id;
        req.session.username = result.userName;
        req.session.userImage = result.image;
        req.session.userEmail = result.email;
        res.redirect('/')
        req.flash('SuccessLogin','Logged in successfully')
    }).catch(err => {
        console.log(err);
        req.flash('LoginEmailValidation',err)
        res.redirect('/login')
    })
}





module.exports = {
    getLogin,
    getSignup,
    postSignup,
    postLogin,
}