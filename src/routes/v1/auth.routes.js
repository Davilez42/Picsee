const Router = require('express')
const controllersV1 = require('../../controllers/v1')
const {validateSignUser,validateSignUpUser} =  require('../../middlewares/validateParams')
const router = Router()

router.post('/sign_user',validateSignUser,controllersV1.signUser)
router.post('/signUp_user',validateSignUpUser,controllersV1.signUpUser)
router.post('/auth_plataform',controllersV1.authPlatformGoogle)

module.exports = router