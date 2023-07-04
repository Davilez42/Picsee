const Router = require('express')
const authController = require('../../controllers/authController')
const router = Router()


router.post('/validateUser',authController.valdiateUser)
router.post('/registerUser',authController.resgiterUser)

module.exports = router