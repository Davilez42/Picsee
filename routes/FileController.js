
const RepositorioPost = require('../models/RepositorioPosts.js')
const RepositorioUsers = require('../models/RepositorioUsers.js')
const {unlink} = require('fs')
class FileController{
    uploadFile = async (req,res,nexy)=>{
        const id_user = req.params.id_user
        const archivo =  req.files.archivo;
        let hastags = req.headers.hastags.split(',')
        console.log(hastags)
        if(hastags.length ==1 && hastags[0].length ==0){
            hastags =null;
        }

        const name_file = archivo.name;

        RepositorioPost.setPost(id_user,name_file,hastags,1).then((id_image)=>{
               const ruta_upload =  __dirname + "/../storage/GaleriaImagenes/" + id_image+"_"+name_file
                archivo.mv(ruta_upload,(error)=>{
                    if (error){
                        res.sendStatus(404)
                    return
                    }
                    console.log("RESPONDE OK")
                    res.sendStatus(200)

                })

        }).catch((error)=>{
            console.error("ERROR DE COPIADO",error)
            res.sendStatus(400)
        })
    }

    saveAvatar = async (req,resp,next)=>{
        const id_user = req.params.id_user
        const archivo =  req.files.archivo;
        const name_file = id_user+"_"+archivo.name

        RepositorioUsers.changed_Avatar(id_user,name_file).then(()=>{
            const ruta_upload =  __dirname + "/../storage/FotosPerfil/" +name_file ;
            archivo.mv(ruta_upload,(error)=>{
               if(error){
                   resp.sendStatus(404)
                   return
               }
               resp.status(200).json({"id_avatar":name_file})
            });
        }).catch(error=>{
            resp.status(404).json({"error":"No se pudo conectar a la base de DATOS"})
        })        
         
    }


    deleteFiles = async(files,folder)=>{
        const ruta_almacenamiento = __dirname + `/../storage/${folder}/`
        
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