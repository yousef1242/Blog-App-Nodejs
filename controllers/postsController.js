const multer = require("multer");
const mongoose= require("mongoose");
const Posts = require("../models/postsModels");



const getPostById = (req,res) => {
  let id = req.params.id
  Posts.findById(id).then((post) => {
    res.render('post',{
      post:post,
      titleName : 'post details',
      isUser : req.session.userId,
      isOwner : post.userId == req.session.userId,
    })
  })
}


const getPostByCategory = (req, res) => {
  mongoose.connect(process.env.CONNECT_MONGODB).then(() => {
    let id = req.params.id;
    Posts.find({categoryPost : id})
    .then((posts) => {
      res.render('categoryPost', {
        titleName : id,
        isUser: req.session.userId,
        posts: posts // pass the retrieved posts to the view
      });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
      console.log('faild get category');
    });
  })
};


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

const editPostById = (req,res) => {
  upload.single('imagePost')(req, res, function (err) {
    let id = req.body.postId
    if (!id) {
      res.status(400).json({message : 'not found the id'})
    }
    Posts.updateOne({_id : id}, 
    {
      imagePost : req.file ? '/' + req.file.filename : '',  
      descriptionPost : req.body.descriptionPost,  
      namePost : req.body.namePost
    })
    .then((result) => {
      console.log(result);
      res.redirect(req.body.url)
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({message: err.message});
    });
  });
};






//add post


const addPostController = (req, res) => {
    mongoose.connect(process.env.CONNECT_MONGODB).then(() => {
      upload.single('imagePost')(req, res, function (err) {
        if (err) {
          console.log('Failed to upload image');
          console.log(err);
          return res.status(500).send('Failed to upload image');
        }
  
        const newPost = {
          userId: req.body.iduser,
          image:req.session.userImage,
          username: req.body.username,
          imagePost: req.file ? '/' + req.file.filename : '', // Store the file path instead of the Buffer object
          date: Date.now(),
          descriptionPost: req.body.descriptionPost,
          namePost: req.body.namePost,
          categoryPost: req.body.categoryPost,
        };
        const add = new Posts(newPost)
        add.save()
          .then((result) => {
            console.log('Post added successfully');
            res.redirect('/portfolio');
          })
          .catch((err) => {
            console.log('Failed to add post');
            console.log(err);
            res.status(500).send('Failed to add post');
          })
          .finally(() => {
            mongoose.disconnect();
          });
      });
    });
  };



  module.exports = {addPostController,getPostById,deletePostById,editPostById,getPostByCategory}