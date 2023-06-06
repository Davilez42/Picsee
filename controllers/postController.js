const RepositorioPosts = require('../models/RepositorioPosts')
const FileController = require('./fileController')
const fileController =  new FileController()
const RepositorioHastags =  require("../models/RepositorioHastags")
require("dotenv").config()

const getposts= async(req,resp)=>{
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
             return resp.status(500).json({"messageError":"error: No se pudo conectar a la base de datos"})
         }
     }
 }


 const getHastags = async (req,resp)=>{
    try {
      const hastags =  await RepositorioHastags.getHastags();
      return resp.status(200).json({"hastags":hastags})
    } catch (rason) {
      if(rason.code === process.env.dataBaseConectionRefused) {
          return resp.status(500).json({"messageError":"error: No se pudo conectar a la base de datos"})
      }
    }
  }

const setlike = async(req,resp)=>{
    try {
        if(req.params.id_post == undefined || req.params.id_user == undefined){
            throw new Error('Error: entradas incorrectas')
        }
        const id_user = parseInt(req.params.id_user);
        const id_post = parseInt(req.params.id_post)
        if(isNaN(id_user) || isNaN(id_post)){
            throw new Error('Error: Tipos de datos incorrectos')
        }
    
        const resps =  await RepositorioPosts.setLikePost(id_post,id_user);
        const likes = await RepositorioPosts.getLikesByIdPost(id_post)
        return resp.json({"accion":resps,"likes":likes.likes})
    } catch (rason) {
   
        if(rason.code === process.env.dataBaseConectionRefused) {
            return resp.status(500).json({"messageError":"error: No se pudo conectar a la base de datos"})
        }
        return resp.sendStatus(404)
    }
    
    
}

 module.exports = {getposts,getHastags,setlike}