
const getConection = require("./ConfigDataBase");

const setImage = async(name_file)=>{
    const conection = await getConection();
    const file_name = name_file.split('.')[0]
    const exten = name_file.split('.')[1]
    return  conection.execute(`Insert into artgalery.images (name,format_) VALUES("${file_name}","${exten}")`)
    .then(()=>{
     return conection.execute(`Select id_image from images where name="${file_name}"`).then(date=> date[0][0].id_image)
          .catch((error)=>{
        return error;
          })
    })
    
  }

const deleteImages= async(user)=>{
const conection = await getConection();
return conection.execute(`Select  concat( i.id_image,"_",i.name,".", i.format_)  AS f_name 
                      from posts p
                      join images i on p.id_image = i.id_image
                      where p.id_user = ${user}`).then(data=>data[0]);
}  

module.exports = {setImage,deleteImages};