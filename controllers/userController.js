require("dotenv").config();
const RepositorioUser = require('../models/RepositorioUsers')
const RepositorioImages = require('../models/RepositorioImages')
const FileController = require('./fileController')
const fileController =  new FileController()


const change_state = async (req,resp)=>{
    try {
       const data_req = req.query;
       if(data_req.state_sesion == undefined ){
          throw new Error("Error: Los parametros son incorrectos ")
       }
       const state = parseInt(data_req.state_sesion)
       if(isNaN(state) ){
          throw new Error("Error: Tipo de datos incorrectos")
       }

      await RepositorioUser.changed_State(data_req.id_user,state)

       return resp.sendStatus(200)
    } catch (rason) {
       if(rason.code === process.env.dataBaseConectionRefused) {
          return resp.status(500).json({"messageError":"error: No se pudo conectar a la base de datos"})
       }
       return resp.status(400).json({"messageError":rason.message})
    }
}


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

module.exports = {change_state,delete_User}