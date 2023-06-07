const dbconnection = require("./db");
const getDateTimeNow = require("./ServiceDateTime");
const RepositorioImages = require("./RepositorioImages")
const RepositorioHastags = require("./RepositorioHastags")
const getPosts_Relevant = async () => {

  const posts =
    await dbconnection.query(`SELECT  concat( id_image,"_",name,".", format_)  AS f_name 
                                                FROM posts
                                                join images using (id_image)
                                                order by likes,upload_date DESC
                                                limit 10`);
  return posts[0].map((img) => img.f_name);
};


const getPosts = async (id_user) => {

  const posts = await dbconnection.query(`SELECT id_post,likes, concat( id_image,"_",name,".", format_)  AS f_name 
                                                FROM posts
                                                join images using (id_image)
                                                order by upload_date DESC`);
  
  let likes = await dbconnection.query(`Select id_post from users_post_liked where id_user=${id_user} `)                                               
//mapeo los posts y agrego campo liked con 0 y 1 para que el fronted lo interprete
  likes = likes[0].map(d=>d.id_post)
  posts[0].map(d=>{
    if(likes.includes(d.id_post)){
      d["liked"] = 1
    }else{
      d["liked"] = 0
    } 
  })

  return posts[0];
};



const getPostsByhastag = async (id_user,id_hastag) => {

  let posts = await dbconnection.execute(`select id_post,likes, concat( id_image,"_",name,".", format_)  AS f_name
    from posts p 
    join images using (id_image)
    join relation_post_to_hastags rpth  using(id_post) 
    where id_hastag = ${id_hastag} `);

    let likes = await dbconnection.execute(`Select id_post from users_post_liked where id_user=${id_user} `)                                               
    //mapeo los posts y agrego campo liked con 0 y 1 para que el fronted lo interprete
      likes = likes[0].map(d=>d.id_post)
      posts[0].map(d=>{
        if(likes.includes(d.id_post)){
          d["liked"] = 1
        }else{
          d["liked"] = 0
        } 
      })

    return posts[0];
};

const setLikePost = async (id_post, id_user) => {

  let operacion = "+"
  const resultado = await dbconnection.execute(`SELECT * from users_post_liked where id_post=${id_post} and id_user=${id_user}`)
  if (resultado[0].length!=0){
    operacion="-"
  }
  await dbconnection.execute(`UPDATE posts set likes = likes ${operacion} 1  where id_post = ${id_post}`)

  if(operacion==="+"){
      return dbconnection.execute(`Insert into users_post_liked (id_post,id_user) VALUES(${id_post},${id_user})`)
  }
  else{
    return dbconnection.execute(`DELETE from users_post_liked where id_post=${id_post} and id_user=${id_user}`)
      
  }

    
};


const setPost = async(id_user,name_file,hastags,visible)=>{
  const id_image = await RepositorioImages.setImage(name_file);
  console.log(getDateTimeNow.getDateTimeNow());
  return dbconnection.query(`Insert into posts (id_image,id_user,likes,upload_date,visibe)
  VALUES (${id_image},${id_user},${0},"${getDateTimeNow.getDateTimeNow()}",${visible})
  `).then((data)=>{

    if(hastags!=null){
      return RepositorioHastags.setHastags(hastags).then(()=>{
           return  RepositorioHastags.setRelationHastags(data[0].insertId,hastags).then(()=>id_image)
      }) 
    }
    return id_image
  
    })

}

module.exports = {
  getPosts_Relevant,
  getPosts,
  setLikePost,
  getPostsByhastag,
  setPost

};
