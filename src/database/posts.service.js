const pool = require("./connection");
const getDateTimeNow = require("../tools/dateTime.tool");

const getPosts_Relevant = async () => {
  const dbconnection = await pool.connect();
  const data = await dbconnection.query(`SELECT url_image 
                                        FROM (SELECT *
                                        FROM posts
                                        join images using (id_image)                                               
                                        order by likes DESC) as p
                                        order by upload_date
                                        limit 20
   `);
  dbconnection.release();
  return data.rows.map((img) => img.url_image);
};

const getPosts = async (id_user) => {
  const dbconnection = await pool.connect();
  const posts =
    await dbconnection.query(`SELECT id_post,likes, url_image ,username as username_autor, url as avatar_autor
                                                FROM posts
                                                join images using (id_image)
                                                join users  using (id_user)
                                                join avatars_users using(id_user)
                                                order by upload_date DESC  `);

  let likes = await dbconnection.query(
    `Select id_post from users_post_liked where id_user=${id_user} `
  );
  dbconnection.release();
  //mapeo los posts y agrego campo liked con 0 y 1 para que el fronted lo interprete
  likes = likes.rows.map((d) => d.id_post);
  posts.rows.map((d) => {
    if (likes.includes(d.id_post)) {
      d["liked"] = 1;
    } else {
      d["liked"] = 0;
    }
  });

  return posts.rows;
};

const getPostsByhastag = async (id_user, id_hastag) => {
  const dbconnection = await pool.connect();
  let posts =
    await dbconnection.query(`select id_post,likes,url_image,username as username_autor, url as avatar_autor
    from posts p 
    join images using (id_image)
    join users using (id_user)
    join avatars_users using(id_user) 
    join relation_post_to_hastags rpth  using(id_post) 
    where id_hastag = ${id_hastag} `);

  let likes = await dbconnection.query(
    `Select id_post from users_post_liked where id_user=${id_user} `
  );

  dbconnection.release();
  //mapeo los posts y agrego campo liked con 0 y 1 para que el fronted lo interprete
  likes = likes.rows.map((d) => d.id_post);
  posts.rows.map((d) => {
    if (likes.includes(d.id_post)) {
      d["liked"] = 1;
    } else {
      d["liked"] = 0;
    }
  });

  return posts.rows;
};

const setLikePost = async (id_post, operation) => {
  const dbconnection = await pool.connect();
  const data = await dbconnection.query(
    `UPDATE posts set likes = likes ${operation} 1  where id_post = ${id_post};`
  );
  dbconnection.release();
  return data;
};

const setPosts = async (id_user, ids_images, visible) => {
  const dbconnection = await pool.connect();

  let values = [];

  const current_time = getDateTimeNow();

  for (const id of ids_images) {
    values.push(`(${id},${id_user},${0},'${current_time}',${visible})`);
  }

  const data = await dbconnection.query(
    `Insert into posts (id_image,id_user,likes,upload_date,visibe)
      VALUES ${values.join(",")} RETURNING id_post`
  );

  dbconnection.release();
  return data.rows.map((p) => p.id_post);
};

module.exports = {
  getPosts_Relevant,
  getPosts,
  setLikePost,
  getPostsByhastag,
  setPosts,
};
