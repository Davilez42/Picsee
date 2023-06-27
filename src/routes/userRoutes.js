const {Router} = require('express')
const router = Router()
const FileController = require('../controllers/fileController')
const controllerPosts = require('./postsRoutes')
const ServiceWebAccessToken = require('../middleware/webAccessToken')
const fileupload = require('express-fileupload');
const fileController = new FileController();
const {delete_User,setPreInfo} = require('../controllers/userController')
const verifyIdUser = require('../middleware/verifyIdUser')
router.use(fileupload())


router.delete('/Delete_User',verifyIdUser,ServiceWebAccessToken.validateToken,delete_User)
router.patch('/changedAvatar/:id_user',verifyIdUser,ServiceWebAccessToken.validateToken,fileController.saveAvatar)
router.patch('/setpreinfoUser/:id_user',verifyIdUser,ServiceWebAccessToken.validateToken,setPreInfo)

router.use(controllerPosts)
module.exports = router