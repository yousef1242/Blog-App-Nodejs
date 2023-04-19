const mongoose = require("mongoose");



const postShcema = mongoose.Schema({
    userId : String,
    image : String,
    username : {type : String, default : ''} ,
    imagePost : {type : String}, 
    date:{type : Date, default : Date.now()} , 
    descriptionPost : {type : String}, 
    namePost : {type : String},
    categoryPost : {type : String, default : ''},
})


const Posts = mongoose.model('Post',postShcema)



module.exports = Posts