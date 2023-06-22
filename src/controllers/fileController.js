
const RepositorioPost = require('../services/posts.service.js')
const RepositorioImages = require('../services/images.service.js')
const RepositorioHastags = require('../services/hastags.service.js')
const RepositorioAvatarsUsers = require('../services/avatarsUsers.service.js')
const ImageKit = require('imagekit')
const imagekit = new ImageKit({
    publicKey : "public_tN+GbIXQt6n+37QgX8Du6L7FSm4=",
    privateKey : "private_NPAxmrhLYKVEYAsfp5souoh/B5Y=",
    urlEndpoint : "https://ik.imagekit.io/picmont/",                   
})
require('dotenv')
class FileController{
    uploadFile = async (req,res,nexy)=>{
        try {
                const id_user = req.params.id_user
                let archivos =  req.files.archivo;
                let hastags = req.headers.hastags.split(',')

                if(hastags.length ==1 && hastags[0].length ==0){
                    hastags =null;
                }
                if (archivos.length == undefined){
                    archivos = [archivos]
                }
                if(archivos.length>4){
                    throw new Error('Error: maximo de archivos excedido')
                }

                let data_images =[]
                for (let i = 0; i < archivos.length; i++){
                    await
                    imagekit.upload({
                        file:archivos[i].data,
                        fileName: archivos[i].name                  
                    }).then(r=>{
                        data_images.push({'url':r.url,'id_cdn':r.fileId})
                    })
                    .catch(er=>{
                        console.log('Error:',er);
                    })                  
                }
               // console.log(data_images);
                const ids_image = await RepositorioImages.setImages(data_images);
                const id_posts = await RepositorioPost.setPosts(id_user,ids_image,1)
                if(hastags!=null){
                    console.log(hastags);
                    await RepositorioHastags.setHastags(hastags)
                    RepositorioHastags.setRelationHastags(id_posts,hastags)}                        
                res.sendStatus(204)
        } catch (error) {
            res.status(400).json({"messageError":error.message})  
        }
        
    }

    //TODO
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

                const avatar = await RepositorioAvatarsUsers.getAvatar(id_user) 
                 console.log(avatar);
                if(avatar.id_cdn!=0){
                    this.deleteFiles([{id_cdn:avatar.id_cdn}])
                }    //elimino el avatar el en servidor de iamgenes 
                const a = await imagekit.upload({file:archivo.data,fileName:archivo.name})
                                .then(async r=>{             
                                return RepositorioAvatarsUsers.updateAvatar(avatar.id_avatar,{'url':r.url,'id_cdn':r.fileId})
                                        .then(()=>{
                                            return {'url':r.url}
                                        })         
                                })

                return resp.status(200).json(a)        
            } catch (rason) {
            if(rason.code === process.env.dataBaseConectionRefused) {
                return resp.status(500).json({"messageError":"error: No se pudo conectar a la base de datos"})
             } 
             console.log(rason.code);
            return resp.status(400).json({"messageError":rason.message})
        }               
    }


    deleteFiles = async(files)=>{        
        if (files.length ==0) {
            return
        }
        files.forEach(i=>{
            console.log(i);
            imagekit.deleteFile(i.id_cdn).catch(error => {
                return error
            });
            }
        )

    }
}

module.exports =  FileController;