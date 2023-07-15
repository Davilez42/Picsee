const Router = require('express')
const authController = require('../../controllers/authController')
const authPlataformController = require('../../controllers/authPlataformController')
const router = Router()


router.post('/validateUser',authController.valdiateUser)
router.post('/registerUser',authController.resgiterUser)
router.post('/auth_plataform',authPlataformController.authUser)

module.exports = router