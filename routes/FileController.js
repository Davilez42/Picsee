const RepositorioPost = require('../models/RepositorioPosts.js')
class FileController{
    uploadFile = async (req,res,nexy)=>{
        const id_user = req.params.id_user
        const archivo =  req.files.archivo;
        const name_file = archivo.name;

        RepositorioPost.setPost(id_user,name_file,'Amor',1).then((id_image)=>{
               const ruta_upload =  __dirname + "/../storage/GaleriaImagenes/" + id_image+"_"+name_file
                archivo.mv(ruta_upload,(error)=>{
                    if (error){
                        res.sendStatus(404)
                    return
                    }
                    res.sendStatus(200)

                })

        }).catch((error)=>{
            res.sendStatus(400).json({
                "error":error
            })
        })
    }
}

module.exports =  FileController;