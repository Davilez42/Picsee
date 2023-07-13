const RepositorioUser = require('../services/users.service')
const generateToken = require('../services/generateToken.service')
const serviceEncrypted =require('../services/encrypted.service')
const RepositoryAvatarsUser = require('../services/avatarsUsers.service')

require("dotenv").config();
const valdiateUser = async(req,resp)=>{ 
    try {
       const {username,password} = req.body;
       if(username.trim()==="" || password.toString().length==0){
          throw new Error("Error: Campos vacios , Porfavor suministre todo los campos")
       }
       if(password.toString().length<9){
          throw new Error("Error: El campo de la contraseña debe ser mayor o igual a 9")
       }
       
       const user_bd = await RepositorioUser.get_user_Loguin(username)
       if (user_bd.length == 0) {
          return resp.status(200).json({"username":[false,username]})
       }
       if (await serviceEncrypted.compare_(user_bd[0].passwrd , password)){
             const data = {
                   "id_user":user_bd[0].id_user,
                   "avatar":{url:user_bd[0].url},
                   "username":[true,user_bd[0].username],
                   "password":true};
             const access_token = generateToken({"id_user":data.id_user,"username":user_bd.username})
             data['token']=access_token
             return resp.header('auth',access_token).json(data)     
             }
       return resp.status(200).json({"username":[true,username],"password":false})     
             
    } catch (rason) {
       if(rason.code === process.env.dataBaseConectionRefused) {
          return resp.status(500).json({"messageError":"error:No se pudo conectar a la base de datos"})
       }   
          return resp.status(400).json({"messageError":rason.message})  
       }
       
    }

const resgiterUser = async (req,resp)=>{
    try {
       const {username,password,email,first_names,last_names} = req.body;
       if([username,first_names,last_names,email,password].includes(undefined)){
          throw new Error("Error: Entradas incorrectas")
       }

      [username,first_names,last_names,email,password].map(d=>{
         if(d.trim()===''){
            throw new Error('Error: Porfavor suministre todos los campos ')
         }
      })
       
      
       if(password.toString().length<9){
          throw new Error("Error:El campo de la contraseña debe ser mayor o igual a 9")
       }

       const respuesta = await RepositorioUser.insert_user(data_req)
       RepositoryAvatarsUser.insertAvatar(respuesta)
       const access_token = generateToken({"id_user":respuesta,"username":username,
                                                                            "password":password})
       return resp.status(200).json({
          "succes":true,
          "id_user": respuesta,
          "avatar":{url:'https://ik.imagekit.io/picmont/icons/default_avatar.png?updatedAt=1687206611943',id_cnd:0},
          "username":[true,username],
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