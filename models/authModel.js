const mongoose = require("mongoose");
const User = require("./userModelShcema");
const bcrypt = require("bcrypt");



// postSignupModel

const postSignupModel = (username, email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.CONNECT_MONGODB)
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((user) => {
        if (user) {
          mongoose.disconnect();
          reject("Email is already in use");
        } else {
          return bcrypt.hash(password, 10);
        }
      })
      .then((hashedPassword) => {
        const addUser = new User({
          username: username,
          email: email,
          password: hashedPassword,
        });
        return addUser.save();
      })
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

// postLoginModel

const postLoginModel = (email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.CONNECT_MONGODB)
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((user) => {
        if (!user) {
          mongoose.disconnect();
          reject("Email not found");
        } else {
          bcrypt.compare(password, user.password).then((result) => {
            if (result === true) {
              mongoose.disconnect();
              resolve({
                id: user._id,
                userName: user.username,
                image : user.image,
                email : user.email,
              });
            } else {
              mongoose.disconnect();
              reject("Password does not match");
            }
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = { postSignupModel, postLoginModel };