require("dotenv").config();
const RepositorioUser = require('../services/users.service')
const RepositorioImages = require('../services/images.service')
const RepositorioAvatarsUsers = require('../services/avatarsUsers.service')
const FileController = require('./fileController')
const fileController =  new FileController()


const delete_User = async(req,resp)=>{
    try {
       const data_req = req.query;
      const imagenes_eliminar = await  RepositorioImages.getImagesByIdcdn(data_req.id_user);       
      const avatar_user = await RepositorioAvatarsUsers.getAvatar(data_req.id_user)
   
      await RepositorioUser.delet_user(data_req.id_user);       
      await RepositorioImages.deleteImages(imagenes_eliminar);   

      await fileController.deleteFiles([...imagenes_eliminar,{id_cdn:avatar_user.id_cdn}]);

      resp.sendStatus(204)
 
    } catch (rason) {
       if(rason.code === process.env.dataBaseConectionRefused) {
          return resp.status(500).json({"messageError":"error: No se pudo conectar a la base de datos"})
       }
       console.log(rason);
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