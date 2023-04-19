const mongoose = require("mongoose");



const UserShcema = mongoose.Schema({
    username : {type : String, default : ''},
    email : {type : String, default : ''},
    password : {type : String, default : ''},
    image : {type : String , default : '/profileImage.jpg'},
})


const User = mongoose.model('User',UserShcema)



module.exports = User