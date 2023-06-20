
const {Router} =  require('express')
const FileController = require('../controllers/fileController')
const fileController =  new FileController()
const ServiceWebAccessToken = require('../middleware/webAccessToken')
const {getposts,getHastags,setlike} = require('../controllers/postController')
const verifyUser = require('../middleware/verifyUser')
const router = Router()
require("dotenv").config()

const rateLimit   = require("express-rate-limit");
const apiLimiter = rateLimit({
    windowMs: 900,
    max: 1, //peticiones por up dentro de la ventana de tiempo
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.get('/Posts/:option',verifyUser,ServiceWebAccessToken.validateToken,getposts)
router.get('/Hastags',getHastags)
router.patch('/lkd/post/:id_post/liked/user/:id_user',apiLimiter,ServiceWebAccessToken.validateToken ,setlike)
router.post('/uploadFile/:id_user',ServiceWebAccessToken.validateToken,verifyUser,fileController.uploadFile)
module.exports = router