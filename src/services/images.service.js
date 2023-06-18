
const dbconnection = require("./db.service");

const setImages = async(name_file)=>{    
    let ids = []
    for (const name of name_file) {
      let file_name = name.split('.')
      const exten = file_name.pop()
      file_name = file_name.join(".")
      await  dbconnection.execute(`Insert into artgalery.images (name,format_) VALUES ("${file_name}","${exten}") `)
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


const deleteImages= async(images)=>{
  
  if(images.length==0){
    return
  }
  
  let consulta = []
  for (const nma of images) {
      consulta.push(nma.f_name.split("_")[0])
  }
 // console.log(consulta)
  consulta = "("+consulta.join(",")+")"
  return dbconnection.execute(`DELETE from images where id_image in ${consulta}`)
}

module.exports = {setImages,getImagesById,deleteImages};