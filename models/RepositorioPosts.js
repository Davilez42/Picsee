const getConection = require("./ConfigDataBase");
const getDateTimeNow = require("./ServiceDateTime");

const getPosts_Relevant = async () => {
  const conection = await getConection();
  const posts =
    await conection.execute(`SELECT  concat( id_image,"_",name,".", format_)  AS f_name 
                                                FROM posts
                                                join images using (id_image)
                                                order by likes,upload_date DESC
                                                limit 10`);
  return posts[0].map((img) => img.f_name);
};
const getPosts = async () => {
  const conection = await getConection();
  const posts =
    await conection.execute(`SELECT id_post,likes, concat( id_image,"_",name,".", format_)  AS f_name 
                                                FROM posts
                                                join images using (id_image)
                                                order by upload_date DESC`);
  return posts[0];
};

const getPostsByhastag = async (id_hastag) => {
  const conection = await getConection();
  const posts = await conection.execute(`select id_post,likes, concat( id_image,"_",name,".", format_)  AS f_name
    from posts p 
    join images using (id_image)
    join relation_post_to_hastags rpth  using(id_post) 
    where id_hastag = ${id_hastag} `);
    return posts[0];
};

const setLikePost = async (id_post, id_user) => {
  const conection = await getConection();
  return conection
    .execute(`UPDATE posts set likes = likes + 1  where id_post = ${id_post}`)
    .then(() => {
      return 200;
    })
    .catch((err) => {
      console.error(err);
      return 404;
    });
};

module.exports = {
  getPosts_Relevant,
  getPosts,
  setLikePost,
  getPostsByhastag
};
