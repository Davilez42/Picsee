
const {Router} =  require('express')
const FileController = require('../controllers/fileController')
const fileController =  new FileController()
const ServiceWebAccessToken = require('../middleware/webAccessToken')
const {getposts,getHastags,setlike} = require('../controllers/postController')
const verifyUser = require('../middleware/verifyUser')
const router = Router()
require("dotenv").config()

const rateLimit     = require("express-rate-limit");
/* const apiLimiter = rateLimit({
    windowMs: 5\*60\*1000,
  max: 3 //peticiones por up dentro de la ventana de tiempo
});
 */


router.get('/Posts/:option',verifyUser,ServiceWebAccessToken.validateToken,getposts)
router.get('/Hastags',getHastags)
router.patch('/lkd/post/:id_post/liked/user/:id_user/:op',ServiceWebAccessToken.validateToken ,setlike)
router.post('/uploadFile/:id_user',ServiceWebAccessToken.validateToken,verifyUser,fileController.uploadFile)


module.exports = router