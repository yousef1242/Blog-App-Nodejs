const router = require('express').Router()
const bodyParser = require('body-parser').urlencoded({extended : true})
const postsController = require('../controllers/postsController')
const findAccountController = require('../controllers/findAccountController')
const { isAuth } = require('./guard/authGuard')


router.get('/',isAuth,findAccountController.getMyPortfolio)

router.get('/:id',findAccountController.getPortfolioAll)


router.post('/:id/add',
isAuth,
bodyParser,
postsController.addPostController)


router.post('/change-image',
isAuth,
bodyParser,
findAccountController.changeImageController)



module.exports = router