const RepositorioUser = require('../services/users.service')
const validateIdUser = async(req,resp,next)=>{
    const id_user = req.params.id_user || req.query.id_user || req.headers["id"]
    try {
        if(req.params.option=="relevants"){
            next()
            return
          } 
        if(id_user == undefined || id_user.trim()===''){
            throw new Error("Error: Los parametros son incorrectos ")
        }
        if(isNaN(parseInt(id_user))){
            throw new Error("Error: Tipo de datos incorrectos")
         }
         next()        
    } catch (error) {
        return resp.status(400).json({"messageError":error.message})
    }
    
}
module.exports = {
    validateIdUser
}