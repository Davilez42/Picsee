const Router =  require('express')
const authRoutes = require('./authRoutes')
const userRoutes =  require('./userRoutes')

const router =  Router()

router.get('/',(req,res)=>{return res.json({"message":"Welcome To routes v1 !"})})
router.use(authRoutes)
router.use(userRoutes)

module.exports =  router