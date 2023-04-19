const  mongoose = require("mongoose");
const User = require("../models/userModelShcema");
const Posts = require("../models/postsModels");
const multer = require("multer");


const getMyPortfolio = (req,res) => {
    res.redirect('/portfolio/' + req.session.userId)
}



const getPortfolioAll = (req,res) => {
    const id = req.params.id
    mongoose.connect(process.env.CONNECT_MONGODB).then(() => {
            User.findById(id).then((result) => {
                req.session.UserProfileId = result._id
                Posts.find({userId : req.session.UserProfileId}).then((posts) => {
                    res.render('portfolio',{
                        isUser : req.session.userId,
                        titleName : 'profile',
                        result : result,
                        posts : posts,
                        isOwner : id == req.session.userId,
                        userPosts : result.username,
                    })
                })
        }).catch(err => console.log(err))
    }).catch(err => console.log("fail to connect mongodb"))
}



const deletePostById = (req,res) => {
    let id = req.body.postId
    Posts.findByIdAndDelete(id).then(() => {
      res.redirect(req.body.url)
    })
  }
  
  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
  })
  
  const upload = multer({ storage: storage })
  
  const changeImageController = (req,res) => {
    upload.single('image')(req, res, function (err) {
      let id = req.body.userId
      if (!id) {
        res.status(400).json({message : 'not found the id'})
      }
      User.findByIdAndUpdate(id, 
      {
        image : req.file ? '/' + req.file.filename : '',  
      })
      .then((result) => {
        res.redirect('/portfolio')
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({message: err.message});
      });
    });
  };
  



  
  
module.exports = {getMyPortfolio,getPortfolioAll,changeImageController}



