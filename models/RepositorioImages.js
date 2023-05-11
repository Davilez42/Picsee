
const getConection = require("./ConfigDataBase");

const setImage = async(name_file)=>{
    const conection = await getConection();
    let file_name = name_file.split('.')
    const exten = file_name.pop()
    file_name = file_name.join(".")
    return  conection.execute(`Insert into artgalery.images (name,format_) VALUES("${file_name}","${exten}")`)
    .then(async()=>{
     return conection.execute(`Select id_image from images where name="${file_name}"`).then(date=> date[0][0].id_image)
          .catch((error)=>{
        return error;
          })
    })
    
  }

const getImagesById= async(user)=>{
const conection = await getConection();
return conection.execute(`Select  concat( i.id_image,"_",i.name,".", i.format_)  AS f_name 
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
  const conection = await getConection();
  return conection.execute(`DELETE from images where id_image in ${consulta}`)
}

module.exports = {setImage,getImagesById,deleteImages};