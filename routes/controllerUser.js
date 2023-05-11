const {Router} = require('express')
const {static}= require('express')
const ServiceEncrypted =require('../models/ServiceEncrypted')
const router = Router()
const RepositorioUser = require('../models/RepositorioUsers')
const RepositorioPosts =  require('../models/RepositorioPosts')
const RepositorioHastags =  require("../models/RepositorioHastags")
const RepositorioImages = require('../models/RepositorioImages')
const FileController = require('./FileController')
const controllerPosts = require('../routes/controllerPosts')
const ServiceWebAccessToken = require('../models/ServiceWebAccessToken')
const fileController = new FileController();

router.post('/login',async(req,resp)=>{  
   const user_bd = await RepositorioUser.get_user_Loguin(req.body.username)
   if(user_bd!=null){
         if (ServiceEncrypted.comparePassword(user_bd.passwrd,req.body.password)){
            const data = {
               "id_user":user_bd.id_user,
               "id_avatar":user_bd.id_avatar,
               "username":user_bd.username,
               "password":true};
            const access_token = ServiceWebAccessToken.generateAccessToken({"id_user":data.id_user,
                                                                              "username":user_bd.username})

            return resp.header('auth',access_token).json({
                              "id_user":user_bd.id_user,
                              "id_avatar":user_bd.id_avatar,
                              "username":user_bd.username,
                              "password":true,
                              "token":access_token})
         }
         return resp.json({"password":false})
   }
    return resp.sendStatus(404)
 })
 
 ///JSON WEB TOKEN 



router.post('/registro',async (req,resp)=>{
    console.log(req.body)
      const respuesta = await RepositorioUser.insert_user(req.body)      
      if(typeof respuesta != "object"){ 
            return resp.status(418).json({"valFail":respuesta})
         }
         const access_token = ServiceWebAccessToken.generateAccessToken({"username":req.body.username,
                                                                              "password":req.body.password})

      return resp.json({
         "id_user":  respuesta[0][0].id_user,
         "id_avatar":'default_avatar.png',
         "username":req.body.username,
         "password":true,
      "token":access_token})
 })
 




router.patch('/state_sesion/',(req,resp)=>{
   const datos = req.query
   RepositorioUser.changed_State(datos.id,datos.state_sesion,'x')
   resp.sendStatus(200)
})

router.delete('/Delete_User',ServiceWebAccessToken.validateToken, async(req,resp)=>{
  const id = req.query.id_user
   const imagenes_eliminar = await  RepositorioImages.getImagesById(id);
   fileController.deleteFiles(imagenes_eliminar).then(()=>{
      RepositorioUser.delet_user(req.query).then(()=>{       
         RepositorioImages.deleteImages(imagenes_eliminar).then(()=>{resp.sendStatus(200)})
      })     
   })
   .catch(()=>{resp.sendStatus(400)})  
})

router.use(controllerPosts)
module.exports = router