const Router =  require('express')
const fileupload = require('express-fileupload');
const authRoutes = require('./auth.routes')
const userRoutes =  require('./user.routes')
const postRoutes =  require('./posts.routes')
const router =  Router()
const controllers  = require('../../controllers/v1/')

router.use(fileupload())
router.get('/',(req,res)=>{return res.json({"message":"Welcome To routes v1 !"})})

router.use(authRoutes)
router.use(userRoutes)
router.use(postRoutes)

router.get('/get-token-test',controllers.test)

module.exports =  router