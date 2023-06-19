const {Router} = require('express')
const router = Router()
const FileController = require('../controllers/fileController')
const controllerPosts = require('./postsRoutes')
const ServiceWebAccessToken = require('../middleware/webAccessToken')
const fileupload = require('express-fileupload');
const fileController = new FileController();
const {delete_User,setPreInfo} = require('../controllers/userController')
const verifyUser = require('../middleware/verifyUser')
router.use(fileupload())


router.delete('/Delete_User',ServiceWebAccessToken.validateToken,verifyUser,delete_User)
router.patch('/changedAvatar/:id_user',ServiceWebAccessToken.validateToken,verifyUser,fileController.saveAvatar)
router.patch('/setpreinfoUser/:id_user',ServiceWebAccessToken.validateToken,verifyUser,setPreInfo)

router.use(controllerPosts)
module.exports = router