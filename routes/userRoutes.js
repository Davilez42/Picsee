const {Router} = require('express')
const router = Router()
const FileController = require('../controllers/fileController')
const controllerPosts = require('./postsRoutes')
const ServiceWebAccessToken = require('../middleware/ServiceWebAccessToken')
const fileupload = require('express-fileupload');
const fileController = new FileController();
const {change_state,delete_User} = require('../controllers/userController')
const verifyUser = require('../middleware/verifyUser')
router.use(fileupload())


router.patch('/state_sesion/',ServiceWebAccessToken.validateToken,verifyUser,change_state)
router.delete('/Delete_User',ServiceWebAccessToken.validateToken,verifyUser,delete_User)
router.patch('/changedAvatar/:id_user',ServiceWebAccessToken.validateToken,verifyUser,fileController.saveAvatar)


router.use(controllerPosts)
module.exports = router