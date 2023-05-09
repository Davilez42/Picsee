const { render } = require('ejs')
const {Router} =  require('express')
const repositorioPosts = require('../models/RepositorioPosts')
const FileController = require('../routes/FileController')
const fileController =  new FileController()
const fileupload = require('express-fileupload');
const router = Router()
router.use(fileupload())

router.patch('/lkd/post/:id_post/liked/user/:id_user',async(req,resp)=>{
    console.log(req.params)
    respuesta = await repositorioPosts.setLikePost(req.params.id_post,req.params.id_user);
    console.log(respuesta)
    return resp.sendStatus(respuesta)
})


router.post('/uploadFile/:id_user',fileController.uploadFile)

module.exports = router