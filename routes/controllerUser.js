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
const fileupload = require('express-fileupload');
const fileController = new FileController();
router.use(fileupload())


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
            
  

      try {
         const respuesta = await RepositorioUser.insert_user(req.body)
         const access_token = ServiceWebAccessToken.generateAccessToken({"username":req.body.username,
                                                                              "password":req.body.password})
      return resp.json({
         "id_user":  respuesta,
         "id_avatar":'default_avatar.png',
         "username":req.body.username,
         "password":true,
      "token":access_token})
            
      } catch (rason) {
            const r = rason.sqlMessage.split(' ').pop().slice(1,-1)
            return resp.status(418).json({"valFail":r})
      }
         
 })
 




router.patch('/state_sesion/',(req,resp)=>{
   const datos = req.query
   RepositorioUser.changed_State(datos.id,datos.state_sesion,'x')
   resp.sendStatus(200)
})

router.delete('/Delete_User',ServiceWebAccessToken.validateToken, async(req,resp)=>{
  const id = req.query.id_user;
  const id_avatar = req.query.id_avatar;
  //console.log(id_avatar,"IDE EXISTENTE")
   try {
      const imagenes_eliminar = await  RepositorioImages.getImagesById(id);
      await RepositorioUser.delet_user(req.query);
      await RepositorioImages.deleteImages(imagenes_eliminar);  
      await  fileController.deleteFiles(imagenes_eliminar,'GaleriaImagenes');
      if (id_avatar!="default_avatar.png") {
         await  fileController.deleteFiles([{"f_name":id_avatar}],'FotosPerfil');   
      }
      
      
    
    resp.sendStatus(200)

   } catch (error) {
      resp.status(400).json({"error":error})
   }


})


router.patch('/changedAvatar/:id_user',ServiceWebAccessToken.validateToken,fileController.saveAvatar)


router.use(controllerPosts)
module.exports = router