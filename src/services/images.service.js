
const dbconnection = require("./db.service");

const setImage = async(name_file)=>{
    let file_name = name_file.split('.')
    const exten = file_name.pop()
    file_name = file_name.join(".")
    return  dbconnection.execute(`Insert into artgalery.images (name,format_) VALUES("${file_name}","${exten}")`)
    .then(async(data)=>{
     return data[0].insertId
    })
    
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

module.exports = {setImage,getImagesById,deleteImages};