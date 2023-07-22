
const {Router} =  require('express')
const {validateToken} = require('../../middlewares/validateToken.middleware')
const {validateIdUser,validateFiles,validateIdPost} = require('../../middlewares/validateParams.middleware')
const controllers = require('../../controllers/v1/')
const router = Router()
const rateLimit   = require("express-rate-limit");
const apiLimiter = rateLimit({
    windowMs: 900,
    max: 1, //peticiones por up dentro de la ventana de tiempo
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.get('/get_posts/:filter',validateToken,validateIdUser,controllers.getPosts)

router.get('/get_hastags',controllers.getHastags)

router.patch('/setlike/:id_post/by/:id_user',apiLimiter,validateIdUser,validateIdPost,validateToken ,controllers.setLike)

router.post('/uploadFile/:id_user',validateIdUser,validateFiles,validateToken,controllers.uploadImage)

module.exports = router