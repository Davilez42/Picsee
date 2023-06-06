
const {Router} =  require('express')
const FileController = require('../controllers/fileController')
const fileController =  new FileController()
const ServiceWebAccessToken = require('../middleware/ServiceWebAccessToken')
const {getposts,getHastags,setlike} = require('../controllers/postController')
const verifyUser = require('../middleware/verifyUser')
const router = Router()
require("dotenv").config()

router.get('/Posts/:option',verifyUser,ServiceWebAccessToken.validateToken,getposts)
router.get('/Hastags',getHastags)
router.patch('/lkd/post/:id_post/liked/user/:id_user',ServiceWebAccessToken.validateToken ,verifyUser,setlike)
router.post('/uploadFile/:id_user',ServiceWebAccessToken.validateToken,verifyUser,fileController.uploadFile)


module.exports = router