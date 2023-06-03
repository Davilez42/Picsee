const {Router} = require('express')
const serviceEncrypted =require('../models/ServiceEncrypted')
const router = Router()
const RepositorioUser = require('../models/RepositorioUsers')
const RepositorioImages = require('../models/RepositorioImages')
const FileController = require('./FileController')
const controllerPosts = require('../routes/controllerPosts')
const ServiceWebAccessToken = require('../models/ServiceWebAccessToken')
const fileupload = require('express-fileupload');
const fileController = new FileController();
router.use(fileupload())
require("dotenv").config();



router.post('/validateUser',async(req,resp)=>{ 
   try {
      //Verifico los datos recibidos
      const data_req = req.body;
      if(data_req.username==="" || data_req.password.toString().length==0){
         throw new Error("Error: Campos vacios , Porfavor suministre todo los campos")
      }
      if(data_req.password.toString().length<9){
         throw new Error("Error: El campo de la contraseña debe ser mayor o igual a 9")
      }
      const user_bd = await RepositorioUser.get_user_Loguin(data_req.username)
      if (user_bd.length == 0) {
         return resp.status(200).json({"username":[false,data_req.username]})
      }
      if (await serviceEncrypted.compare_(user_bd[0].passwrd , data_req.password)){
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
      return resp.status(200).json({"username":[true,data_req.username],"password":false})     
            
   } catch (rason) {
      if(rason.code === process.env.dataBaseConectionRefused) {
         return resp.status(500).json({"messageError":"error:No se pudo conectar a la base de datos"})
      }   
         return resp.status(400).json({"messageError":rason.message})  
      }
      
   }

 )


router.post('/registerUser',async (req,resp)=>{
      try {
         const data_req = req.body;
         if([data_req.username,data_req.first_names,data_req.last_names,data_req.email,data_req.password].includes(undefined)){
            throw new Error("Error: Entradas incorrectas")
         }
         if([data_req.username,data_req.first_names,data_req.last_names,data_req.email,data_req.password].includes('')){
            throw new Error("Error:Campos vacios , Por favor suministre todo los campos")
         }
         if(data_req.password.toString().length<9){
            throw new Error("Error:El campo de la contraseña debe ser mayor o igual a 9")
         }

         const respuesta = await RepositorioUser.insert_user(data_req)
         const access_token = ServiceWebAccessToken.generateAccessToken({"username":data_req.username,
                                                                              "password":data_req.password})
         return resp.status(200).json({
            "succes":true,
            "id_user": respuesta,
            "id_avatar":'default_avatar.png',
            "username":[true,data_req.username],
            "password":true,
            "token":access_token}) 
            
      } catch (rason) {
            if(rason.code === 'ER_DUP_ENTRY'){
               const r = rason.sqlMessage.split(' ').pop().slice(1,-1)
               return resp.status(200).json({"succes":false,"valFail":r})
            }
            if(rason.code === process.env.dataBaseConectionRefused) {
               return resp.status(500).json({"messageError":"error: No se pudo conectar a la base de datos"})
            }
               return resp.status(400).json({"messageError":rason.message})
            }
                
      }
 )
 




router.patch('/state_sesion/',ServiceWebAccessToken.validateToken,async (req,resp)=>{
      try {
         const data_req = req.query;
         if(data_req.id_user == undefined || data_req.state_sesion == undefined ){
            throw new Error("Error: Los parametros son incorrectos ")
         }
         const id = parseInt(data_req.id_user)
         const state = parseInt(data_req.state_sesion)
         if(isNaN(id) || isNaN(state) ){
            throw new Error("Error: Tipo de datos incorrectos")
         }
         const respuesta =  await RepositorioUser.changed_State(id,state)
         if(respuesta[0].affectedRows==0){
            throw new Error("Error: No existe el id proporcionado")
         }
         return resp.sendStatus(200)
      } catch (rason) {
         if(rason.code === process.env.dataBaseConectionRefused) {
            return resp.status(500).json({"messageError":"error: No se pudo conectar a la base de datos"})
         }
         return resp.status(400).json({"messageError":rason.message})
      }
})


router.delete('/Delete_User',ServiceWebAccessToken.validateToken, async(req,resp)=>{
 
   try {
      const data_req = req.query;
      if(data_req.id_user === ''  || data_req.id_avatar === ''){
         throw new Error("Error:Campos vacios , Por favor suministre todo los campos")
      }

      const imagenes_eliminar = await  RepositorioImages.getImagesById(data_req.id_user);
      await RepositorioUser.delet_user(data_req);
      await RepositorioImages.deleteImages(imagenes_eliminar);  
      await  fileController.deleteFiles(imagenes_eliminar,'GaleriaImagenes');
      if (id_avatar!="default_avatar.png") {
         await  fileController.deleteFiles([{"f_name":data_req.id_avatar}],'FotosPerfil');   
      }
      
    resp.sendStatus(204)

   } catch (rason) {
      if(rason.code === process.env.dataBaseConectionRefused) {
         return resp.status(500).json({"messageError":"error: No se pudo conectar a la base de datos"})
      }
     return resp.status(400).json({"messageError":rason.message})
   }


})


router.patch('/changedAvatar/:id_user',ServiceWebAccessToken.validateToken,fileController.saveAvatar)


router.use(controllerPosts)
module.exports = router