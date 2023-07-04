const {Router} = require('express')
const router = Router()
const FileController = require('../../controllers/fileController')
const controllerPosts = require('./postsRoutes')
const {validateToken} = require('../../middleware/validateToken')
const fileupload = require('express-fileupload');
const fileController = new FileController();
const userController = require('../../controllers/userController')
const {validateIdUser} = require('../../middleware/validateParams')
router.use(fileupload())

router.delete('/Delete_User',validateIdUser,validateToken,userController.delete_User)
router.patch('/changedAvatar/:id_user',validateIdUser,validateToken,fileController.saveAvatar)
router.patch('/setpreinfoUser/:id_user',validateIdUser,validateToken,userController.setPreInfo)

router.use(controllerPosts)
module.exports = router