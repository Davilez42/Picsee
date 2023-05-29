const {Router} = require('express')
const {static}= require('express')
const serviceEncrypted =require('../models/ServiceEncrypted')
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


router.post('/validateUser',async(req,resp)=>{ 
   
   try {
      const user_bd = await RepositorioUser.get_user_Loguin(req.body.username)
      if (user_bd.length == 0) {
         return resp.status(200).json({"username":[false,req.body.username]})
      }
      console.log(serviceEncrypted.comparePassword(user_bd[0].passwrd,req.body.password))
      console.log(user_bd[0].passwrd)
      console.log(req.body.password)
      if (serviceEncrypted.comparePassword(user_bd[0].passwrd,req.body.password)){
            const data = {
                  "id_user":user_bd[0].id_user,
                  "id_avatar":user_bd[0].id_avatar,
                  "username":[true,user_bd[0].username],
                  "password":true};
            const access_token = ServiceWebAccessToken.generateAccessToken({"id_user":data.id_user,
                                                                           "username":user_bd.username})
            data['token']=access_token
            return resp.header('auth',access_token).json(data)     
            }
         return resp.status(200).json({"username":[true,req.body.username],"password":false})     
            
   } catch (rason) {
      if(rason.code === 'ECONNREFUSED') {
         return resp.status(400).json({"messageError":"error:No se pudo conectar a la base de datos"})
      }
   
         return resp.status(400).json({"messageError":rason.message})
         
      }
      
   }

 )
 
 ///JSON WEB TOKEN 



router.post('/registerUser',async (req,resp)=>{
      try {
         const respuesta = await RepositorioUser.insert_user(req.body)
         const access_token = ServiceWebAccessToken.generateAccessToken({"username":req.body.username,
                                                                              "password":req.body.password})
         return resp.status(200).json({
            "succes":true,
            "id_user": respuesta,
            "id_avatar":'default_avatar.png',
            "username":[true,req.body.username],
            "password":true,
            "token":access_token})
            
      } catch (rason) {
            if(rason.code === 'ER_DUP_ENTRY'){
               const r = rason.sqlMessage.split(' ').pop().slice(1,-1)
               return resp.status(200).json({"succes":false,"valFail":r})}
            if(rason.code === 'ECONNREFUSED') {
               return resp.status(400).json({"messageError":"error: No se pudo conectar a la base de datos"})
            }
               return resp.status(400).json({"messageError":rason.message})
            }
            
       
      }
 )
 




router.patch('/state_sesion/',(req,resp)=>{
  try {
   const datos = req.query
   RepositorioUser.changed_State(datos.id,datos.state_sesion,'x')
    return resp.sendStatus(200)
   
  } catch (rason) {
   if(rason.code === 'ECONNREFUSED') {
      return resp.status(400).json({"messageError":"error:No se pudo conectar a la base de datos"})
   }
   return resp.status(400).json({"messageError":rason.message})
  }
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

   } catch (rason) {
      if(rason.code === 'ECONNREFUSED') {
         return resp.status(400).json({"messageError":"error: No se pudo conectar a la base de datos"})
      }
     return resp.status(400).json({"error":rason})
   }


})


router.patch('/changedAvatar/:id_user',ServiceWebAccessToken.validateToken,fileController.saveAvatar)


router.use(controllerPosts)
module.exports = router