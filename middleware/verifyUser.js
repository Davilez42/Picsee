const RepositorioUser = require('../models/RepositorioUsers')
const verifyExistUser = async(req,resp,next)=>{
    const id_user = req.params.id_user || req.query.id_user || req.headers["id"]
    try {
        if(req.params.option=="relevants"){
            next()
            return
          } 

        if(id_user == undefined || id_user==''){
            throw new Error("Error: Los parametros son incorrectos ")
        }
        if(isNaN(parseInt(id_user))){
            throw new Error("Error: Tipo de datos incorrectos")
         }

        if(!await RepositorioUser.existUser(id_user)){
            return resp.status(404).json({"messageError":"El usuario no existe"})         
         }
         console.log("Existe:",id_user);
         next()
        
    } catch (error) {
        if(error.code === process.env.dataBaseConectionRefused) {
            return resp.status(500).json({"messageError":"error: No se pudo conectar a la base de datos"})
        }
        return resp.status(400).json({"messageError":error.message})
    }
    
}
module.exports = verifyExistUser