require("dotenv").config();
const RepositorioUser = require('../services/users.service')
const RepositorioImages = require('../services/images.service')
const RepositorioAvatarsUsers = require('../services/avatarsUsers.service')
const FileController = require('./fileController')
const fileController =  new FileController()


const delete_User = async(req,resp)=>{
    try {
       const data_req = req.query;
       if(data_req.id_cnd.trim() === ''){
          throw new Error("Error:Campos vacios , Por favor suministre todo los campos")
       }
       
      const imagenes_eliminar = await  RepositorioImages.getImagesByIdcnd(data_req.id_user);       
      await RepositorioUser.delet_user(data_req.id_user);
          
      await RepositorioImages.deleteImages(imagenes_eliminar);

      await RepositorioAvatarsUsers.deleteAvatarByidCnd(data_req.id_cnd);    

      await fileController.deleteFiles([...imagenes_eliminar,{id_cnd:data_req.id_cnd}]);

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