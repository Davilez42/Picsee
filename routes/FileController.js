
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
                        res.status(500).json({"messageError":error.message})
                        return
                    }

                    res.sendStatus(204)

                })

        }).catch((error)=>{
            res.status(400).json({"messageError":error.message})
        })
    }

    saveAvatar = async (req,resp,next)=>{     
        try {
            const data = req.params
            const id_user = data.id_user
            const archivo = req.files.archivo;
            
            if(id_user == undefined || archivo == undefined){
                throw new Error("Error: entradas invalidas")
            }
            
            if(isNaN(parseInt(id_user))){
                throw new Error("Error: El id es incorrecto")
            } 

            const name_file = id_user+"_"+archivo.name
            await RepositorioUsers.changed_Avatar(id_user,name_file)
            const ruta_upload =  __dirname + "/../storage/FotosPerfil/" +name_file ;

            archivo.mv(ruta_upload,(error)=>{
                if(error){
                    return  resp.status(500).json({"messageError":error.message})
                }
                resp.status(200).json({"id_avatar":name_file})
            });
                 
           
        } catch (rason) {
            if(rason.code === 'ECONNREFUSED') {
                return resp.status(500).json({"messageError":"error: No se pudo conectar a la base de datos"})
             } 

            return resp.status(400).json({"messageError":rason.message})
        }       
         
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