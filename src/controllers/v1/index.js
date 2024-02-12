//* auth
const signController = require("./auth/sign.controller");
const authPlatformGoogleController = require("./auth/authPlataformGoogle.controller");

//* Post
const getPostsController = require("./post/getPosts.controller");
const likeController = require("./post/setLike.controller");
const getTagsController = require("./tags/getTags.controller");
const uploadPostController = require("./post/uploadPost.controller");

//* users
const createUserController = require("./users/createUser.controller");
const deleteUserController = require("./users/deleteUser.controller");
const updateUserController = require("./users/updateUser.controller");// TODO
const updateAvatarController = require("./users/updateAvatar.controller");

module.exports = {
  signController,
  authPlatformGoogleController,
  createUserController,
  deleteUserController,
  updateUserController,
  updateAvatarController,
  uploadPostController,
  getTagsController,
  getPostsController,
  likeController,
};
