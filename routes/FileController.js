const RepositorioPost = require('../models/RepositorioPosts.js')
class FileController{
    uploadFile = async (req,res,nexy)=>{
        const id_user = req.params.id_user
        const archivo =  req.files.archivo;
        const name_file = archivo.name;

        RepositorioPost.setPost(id_user,name_file,'Amor',false);
        
        //TODO
        //guardar imagen en el servidor
        res.sendStatus(200);
    }
}

module.exports =  FileController;