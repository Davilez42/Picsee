const RepositorioUser = require('../services/users.service')
const ServiceWebAccessToken = require('../middleware/webAccessToken')
const serviceEncrypted =require('../services/encrypted.service')
require("dotenv").config();
const valdiateUser = async(req,resp)=>{ 
    try {
       //Verifico los datos recibidos
       const data_req = req.body;
       if(data_req.username.trim()==="" || data_req.password.toString().length==0){
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

const resgiterUser = async (req,resp)=>{
    try {
       const data_req = req.body;
       if([data_req.username,data_req.first_names,data_req.last_names,data_req.email,data_req.password].includes(undefined)){
          throw new Error("Error: Entradas incorrectas")
       }

      [data_req.username,data_req.first_names,data_req.last_names,data_req.email,data_req.password].map(d=>{
         if(d.trim()===''){
            throw new Error('Error: Porfavor suministre todos los campos ')
         }
      })
       
      
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
             const r = rason.sqlMessage.split(' ').pop().slice(1,-1).split('.')[1] 
             return resp.status(200).json({"succes":false,"valFail":r})
          }
          if(rason.code === process.env.dataBaseConectionRefused) {
             return resp.status(500).json({"messageError":"error: No se pudo conectar a la base de datos"})
          }
             return resp.status(400).json({"messageError":rason.message})
          }
              
    }

module.exports = {valdiateUser,resgiterUser}    