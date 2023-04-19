const router = require('express').Router()
const postsController = require('../controllers/postsController')
const bodyParser = require('body-parser').urlencoded({extended:true})

router.get('/:id',postsController.getPostById)

router.get('/category/:id',postsController.getPostByCategory)

router.post('/delete',
bodyParser
,postsController.deletePostById)

router.post('/edit',
bodyParser
,postsController.editPostById)

module.exports = router