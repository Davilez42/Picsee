
const RepositorioPost = require('../services/posts.service.js')
const RepositorioUsers = require('../services/users.service.js')
const RepositorioImages = require('../services/images.service.js')
const RepositorioHastags = require('../services/hastags.service.js')
const {unlink} = require('fs')
require('dotenv')
class FileController{
    uploadFile = async (req,res,nexy)=>{
        const id_user = req.params.id_user
        let archivos =  req.files.archivo;
        let hastags = req.headers.hastags.split(',')
        try {
                if(hastags.length ==1 && hastags[0].length ==0){
                    hastags =null;
                }
                if (archivos.length == undefined){
                    archivos = [archivos]
                }
                if(archivos.length>4){
                    throw new Error('Error: maximo de archivos excedido')
                }

                const name_files = archivos.map(ar=>ar.name)
                const ids_image = await RepositorioImages.setImages(name_files);
                const id_posts = await RepositorioPost.setPosts(id_user,ids_image,1)
                if(hastags!=null){
                    await RepositorioHastags.setHastags(hastags)
                    RepositorioHastags.setRelationHastags(id_posts,hastags)
                }
                
                for (let i = 0; i < ids_image.length; i++) {
                    const ruta_upload =  __dirname + "/../storage/GaleryPics/" + ids_image[i]+"_"+name_files[i]
                    archivos[i].mv(ruta_upload,(error)=>{
                        if (error){
                            res.status(500).json({"messageError":error.message})
                            return
                        }
                    }) 
                
            }
                res.sendStatus(204)
        } catch (error) {
            res.status(400).json({"messageError":error.message})  
        }
        
    }


    saveAvatar = async (req,resp,next)=>{     
        try {
            const data = req.params
            const id_user = data.id_user
            const img_ant = req.headers.id_avatar
            const archivo = req.files.archivo;
            console.log(img_ant);

            if(id_user == undefined || archivo == undefined){
                throw new Error("Error: entradas invalidas")
            }
            
            if(isNaN(parseInt(id_user))){
                throw new Error("Error: El id es incorrecto")
            } 

            const name_file = id_user+"_"+archivo.name
            await RepositorioUsers.changed_Avatar(id_user,name_file)
            const ruta_upload =  __dirname + "/../storage/PerfilPics/" +name_file ;
            archivo.mv(ruta_upload,(error)=>{
                if(error){
                    return  resp.status(500).json({"messageError":error.message})
                }
                resp.status(200).json({"id_avatar":name_file})
            });
               
            this.deleteFiles([{"f_name":img_ant}],'PerfilPics')
           
        } catch (rason) {
            if(rason.code === process.env.dataBaseConectionRefused) {
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