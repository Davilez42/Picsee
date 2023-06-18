const dbconnection = require("./db.service");
const getDateTimeNow = require("./dateTime.service");
const RepositorioImages = require("./images.service")
const RepositorioHastags = require("./hastags.service")


const getPosts_Relevant = async () => {
  const posts = await dbconnection.query(`SELECT  concat( id_image,"_",name,".", format_)  AS f_name 
                                                FROM posts
                                                join images using (id_image)
                                                order by likes,upload_date DESC
                                                limit 10`);
  return posts[0].map((img) => img.f_name);
};

const getPosts = async (id_user) => {
  const posts = await dbconnection.query(`SELECT id_post,likes, concat( id_image,"_",name,".", format_)  AS f_name ,username as username_autor,id_avatar as avatar_autor
                                                FROM posts
                                                join images using (id_image)
                                                join users using (id_user)
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


const existRelation = async(id_post,id_user)=>{
  return  dbconnection.execute(`SELECT * from users_post_liked where id_post=${id_post} and id_user=${id_user}`)
}

const getPostsByhastag = async (id_user,id_hastag) => {
  let posts = await dbconnection.execute(`select id_post,likes, concat( id_image,"_",name,".", format_)  AS f_name,username as username_autor,id_avatar as avatar_autor
    from posts p 
    join images using (id_image)
    join users using (id_user)
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
 
  await dbconnection.query(`UPDATE posts set likes = likes + 1  where id_post = ${id_post};`)
  await dbconnection.query(`Insert into users_post_liked (id_post,id_user) VALUES(${id_post},${id_user})`)   
  return
};

const deleteLike=async(id_post,id_user)=>{
  await dbconnection.query(`UPDATE posts set likes = likes - 1  where id_post = ${id_post};`)
  await  dbconnection.query(`DELETE from users_post_liked where id_post=${id_post} and id_user=${id_user}`)
return
}

const setPosts = async(id_user,ids_images,visible)=>{
  
  console.log(getDateTimeNow.getDateTimeNow());
  let ids_posts = []
  const current_time = getDateTimeNow.getDateTimeNow()
  for (const id of ids_images) {
    
   await dbconnection.query(`Insert into posts (id_image,id_user,likes,upload_date,visibe)
    VALUES (${id},${id_user},${0},"${current_time}",${visible})
    `).then(data=>{
      ids_posts.push(data[0].insertId)
    })
  }

 
  return ids_posts
}

module.exports = {
  getPosts_Relevant,
  getPosts,
  setLikePost,
  getPostsByhastag,
  setPosts,
  existRelation,
  deleteLike

};
