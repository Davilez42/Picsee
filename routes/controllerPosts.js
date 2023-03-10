const { render } = require('ejs')
const {Router} =  require('express')
const repositorioPosts = require('../models/RepositorioPosts')
const router = Router()

router.patch('/lkd/post/:id_post/liked/user/:id_user',async(req,resp)=>{
    console.log(req.params)
    respuesta = await repositorioPosts.setLikePost(req.params.id_post,req.params.id_user);
    console.log(respuesta)
    return resp.sendStatus(respuesta)
})

module.exports = router