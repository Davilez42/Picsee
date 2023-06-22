const Router = require('express')
const { valdiateUser, resgiterUser } = require('../controllers/authController')
const router = Router()


router.post('/validateUser',valdiateUser)
router.post('/registerUser',resgiterUser)

module.exports = router