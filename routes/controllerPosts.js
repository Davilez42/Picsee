const { render } = require('ejs')
const {Router} =  require('express')
const RepositorioPosts = require('../models/RepositorioPosts')
const FileController = require('../routes/FileController')
const fileController =  new FileController()
const RepositorioHastags =  require("../models/RepositorioHastags")
const ServiceWebAccessToken = require('../models/ServiceWebAccessToken')
const router = Router()
require("dotenv").config()

router.get('/Posts/:option',ServiceWebAccessToken.validateToken,async(req,resp)=>{
   try { 
        let posts = null;
        if(req.params.option=="relevants"){
            const posts_relevants = await  RepositorioPosts.getPosts_Relevant()
            posts = posts_relevants;
        }    
        if (req.params.option=="currents") {
            const posts_currents = await RepositorioPosts.getPosts(req.headers["id"]); 
            posts = posts_currents;
        }
        if (req.params.option=="filter") {
            const id_hastag = req.query.id_h
            const posts_currents = await RepositorioPosts.getPostsByhastag(req.headers["id"],id_hastag)
            posts = posts_currents;
        }

        imagenes =  {"imagenes_":posts}
        return resp.status(200).json(imagenes)
    } catch (rason) {
        if(rason.code === process.env.dataBaseConectionRefused) {
            return resp.status(400).json({"messageError":"error: No se pudo conectar a la base de datos"})
        }
    }
})


router.get('/Hastags',async (req,resp)=>{
  try {
    const hastags =  await RepositorioHastags.getHastags();
    return resp.status(200).json({"hastags":hastags})
  } catch (rason) {
    if(rason.code === process.env.dataBaseConectionRefused) {
        return resp.status(500).json({"messageError":"error: No se pudo conectar a la base de datos"})
    }
  }
})



router.patch('/lkd/post/:id_post/liked/user/:id_user',ServiceWebAccessToken.validateToken ,async(req,resp)=>{
    try {
        const resps =  await RepositorioPosts.setLikePost(req.params.id_post,req.params.id_user);
        const likes = await RepositorioPosts.getLikesByIdPost(req.params.id_post)
        return resp.json({"accion":resps,"likes":likes.likes})
    } catch (error) {
        console.log(error)
        if(rason.code === process.env.dataBaseConectionRefused) {
            return resp.status(400).json({"messageError":"error: No se pudo conectar a la base de datos"})
        }
        return resp.sendStatus(404)
    }
    
    
})



router.post('/uploadFile/:id_user',ServiceWebAccessToken.validateToken  ,fileController.uploadFile)

module.exports = router