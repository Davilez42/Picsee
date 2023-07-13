const jwt = require('jsonwebtoken')
const userServices = require('../services/users.service')
require('dotenv').config()
const authUser = async(req,res)=>{
    try {
        const {credential} =  req.body
        const data_decoded =  jwt.decode(credential,process.env.SECRET_KEY_GOOGLE)
        console.log(data_decoded);
        let user_db = await userServices.get_user_Loguin(data_decoded.name)
        if(!user_db){
            ///TODO:creo esquema de usuario y para insertarlo en la base de datos 
            //despues retorno el usuario con su token generado
            const user = {
                username:data_decoded.name,
                id_avata
            }
            const insert_id =  await userServices.insert_user({username:})
        }
        res.status(200).json(data_decoded)      
    } catch (error) {
        res.status(500).json({messageError:error.message})
    }
}


module.exports =  {authUser}