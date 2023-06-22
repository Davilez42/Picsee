
const dbconnection = require("./db.service");

const setImages = async(data_images)=>{    
    let ids = []
    for (const i of data_images) {
      await  dbconnection.execute(`Insert into artgalery.images (url_image,id_cnd) VALUES ("${i.url}","${i.id_cnd}") `)
          .then(async(data)=>{
          ids.push(data[0].insertId)
          })
    }

    return ids
    
    
    
  }

const getImagesById= async(user)=>{
return dbconnection.execute(`Select  concat( i.id_image,"_",i.name,".", i.format_)  AS f_name 
                      from posts p
                      join images i on p.id_image = i.id_image
                      where p.id_user = ${user}`).then(data=>data[0]);
}  
const getImagesByIdcnd= async(user)=>{
  return dbconnection.execute(`Select *
                        from posts p
                        join images i on p.id_image = i.id_image
                        where p.id_user = ${user}`).then(data=>data[0]);
  }  
  

const deleteImages= async(images)=>{
  
  if(images.length==0){
    return
  }
 
  let consulta = []
  for (const nma of images) {
      consulta.push(nma.id_image)
  }
 // console.log(consulta)
  consulta = "("+consulta.join(",")+")"
  return dbconnection.execute(`DELETE from images where id_image in ${consulta}`)
}

module.exports = {setImages,getImagesById,deleteImages,getImagesByIdcnd};