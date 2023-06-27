
const {Router} =  require('express')
const FileController = require('../controllers/fileController')
const fileController =  new FileController()
const {validateToken} = require('../middleware/validateToken')
const postController = require('../controllers/postController')
const {validateIdUser} = require('../middleware/validateParams')
const router = Router()
require("dotenv").config()

const rateLimit   = require("express-rate-limit");
const apiLimiter = rateLimit({
    windowMs: 900,
    max: 1, //peticiones por up dentro de la ventana de tiempo
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.get('/Posts/:option',validateIdUser,validateToken,postController.getposts)
router.get('/Hastags',postController.getHastags)
router.patch('/lkd/post/:id_post/liked/user/:id_user',validateIdUser,apiLimiter,validateToken ,postController.setlike)
router.post('/uploadFile/:id_user',validateIdUser,validateToken,fileController.uploadFile)

module.exports = router