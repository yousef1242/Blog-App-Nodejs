const { default: mongoose } = require("mongoose");
const User = require("../models/userModelShcema");
const Posts = require("../models/postsModels");




exports.getHome = async(req, res, next) => {
  try {
    await mongoose.connect(process.env.CONNECT_MONGODB)
    const users = await Posts.find({});
    res.render('index', { 
      titleName: 'Home',
      LoggeSuccessfully : req.flash('SuccessLogin')[0],
      isUser : req.session.userId,
      posts : users,
     });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};