// auth
const signUser = require('./auth/loguin')
const signUpUser = require('./auth/signUp')
const authPlatformGoogle = require('./auth/authPlataformGoogle')

// Image 
const uploadImage = require('./Images/uploadImage')
const updateImageAvatar = require('./Images/updateImageAvatar')

// Post
const getPosts = require('./post/getPosts')
const setLike = require('./post/setLike')
const getHastags =  require('./hastagas/getHastags')

// users
const deleteUser =  require('./users/deleteUser')
const setMoreInfo = require('./users/setMoreInfo')

// devops
const test =  require('./generate.Token_Test')


module.exports = {
    signUser,
    signUpUser,
    authPlatformGoogle,
    uploadImage,
    updateImageAvatar,
    getPosts,
    setLike,
    deleteUser,
    setMoreInfo,
    getHastags,
    test
}