const router = require('express').Router()
const authController = require('../controllers/authController')
const { notAuth } = require('./guard/authGuard')
const bodyParser = require('body-parser').urlencoded({extended:true})



//get signup page
router.get('/signup',notAuth,authController.getSignup)


//post signup page
router.post(
    '/signup',
    bodyParser,
authController.postSignup,
)




//post signup page
router.post(
    '/login',
    bodyParser,
authController.postLogin
)



//post logout page
router.post('/logout',(req,res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})


//get login page
router.get('/login',notAuth,authController.getLogin)




module.exports = router