require("dotenv").config();
const RepositorioUser = require('../services/users.service')
const RepositorioImages = require('../services/images.service')
const FileController = require('./fileController')
const fileController =  new FileController()


const delete_User = async(req,resp)=>{
    try {
       const data_req = req.query;
       if(data_req.id_avatar === ''){
          throw new Error("Error:Campos vacios , Por favor suministre todo los campos")
       }
       
      const imagenes_eliminar = await  RepositorioImages.getImagesById(data_req.id_user);       
      await RepositorioUser.delet_user(data_req.id_user);
          
       RepositorioImages.deleteImages(imagenes_eliminar);  
       fileController.deleteFiles(imagenes_eliminar,'GaleriaImagenes');
       if (data_req.id_avatar!="default_avatar.png") {
         fileController.deleteFiles([{"f_name":data_req.id_avatar}],'FotosPerfil');   
       }
       
     resp.sendStatus(204)
 
    } catch (rason) {
       if(rason.code === process.env.dataBaseConectionRefused) {
          return resp.status(500).json({"messageError":"error: No se pudo conectar a la base de datos"})
       }
      return resp.status(400).json({"messageError":rason.message})
    }
 
 
 }
const setPreInfo = async(req,resp)=>{
   try {
      //TODO
      console.log(req.body);
   } catch (error) {
      
   }
}

module.exports = {delete_User,setPreInfo}