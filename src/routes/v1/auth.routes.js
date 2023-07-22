const Router = require('express')
const controllersV1 = require('../../controllers/v1')
const {validateSignUser,validateSignUpUser} =  require('../../middlewares/validateParams.middleware.js')
const router = Router()

router.post('/sign_user',validateSignUser,controllersV1.sign)
router.post('/signUp_user',validateSignUpUser,controllersV1.signUp)
router.post('/auth_plataform',controllersV1.authPlatformGoogle)

module.exports = router