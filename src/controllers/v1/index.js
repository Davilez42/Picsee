//* auth
const sign = require("./auth/loguin.controller");
const signUp = require("./auth/signUp.controller");
const authPlatformGoogle = require("./auth/authPlataformGoogle.controller");

//* Image
const uploadImage = require("./Images/uploadImage.controller");
const updateImageAvatar = require("./Images/updateImageAvatar.controller");

//* Post
const getPosts = require("./post/getPosts.controller");
const setLike = require("./post/setLike.controller");
const getHastags = require("./hastags/getHastags.controller.");

//* users
const deleteUser = require("./users/deleteUser.controller");
const setMoreInfo = require("./users/setMoreInfo.controller");// TODO

//! dev
const test = require("./generate.Token_Test.controller");

module.exports = {
  sign,
  signUp,
  authPlatformGoogle,
  uploadImage,
  updateImageAvatar,
  getPosts,
  setLike,
  deleteUser,
  setMoreInfo,
  getHastags,
  test,
};
