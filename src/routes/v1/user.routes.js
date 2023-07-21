const {Router} = require('express')
const {validateToken} = require('../../middlewares/validateToken')
const {validateIdUser} = require('../../middlewares/validateParams')
const controllers = require('../../controllers/v1/')
const router = Router()


router.delete('/delete_user',validateIdUser,validateToken,controllers.deleteUser)
router.patch('/changedAvatar/:id_user',validateIdUser,validateToken,controllers.updateImageAvatar)
router.patch('/setpreinfoUser/:id_user',validateIdUser,validateToken,controllers.setMoreInfo)


module.exports = router