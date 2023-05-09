const { throws } = require('assert');
const RepositorioPost = require('../models/RepositorioPosts.js')
const {unlink} = require('fs')
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
            res.sendStatus(400)
        })
    }


    deleteFiles = async(files)=>{
        const ruta_almacenamiento = __dirname + "/../storage/GaleriaImagenes/"
        
        if (files.length ==0) {
            return
        }

        for(const i in files){
            const file_name = files[i].f_name
            console.log(ruta_almacenamiento+file_name)
            unlink(ruta_almacenamiento+file_name,(err)=>{
                if(err){
                    return err
                }
            })
        }

    }
}

module.exports =  FileController;