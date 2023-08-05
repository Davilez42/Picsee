const pool = require("./connection");
const getDateTimeNow = require("../tools/dateTime.tool");

//Currying
const queryPostDefault = `SELECT id_post,likes, url_image ,username as username_autor, url as avatar_autor 
FROM posts p 
join images using (id_image)
join users using (id_user)
join avatars_users using(id_user) `

const queryPost = (queryDefault) => {
  return (props) => queryDefault + props
}

//Mape los posts que el usuario le haya dado like
const mapLikes = async (posts, id_user) => {
  const dbconnection = await pool.connect();
  let likes = await dbconnection.query(
    `Select id_post from users_post_liked where id_user=${id_user} `
  );
  likes = likes.rows.map((d) => d.id_post);
  posts = posts.map((d) => {
    if (likes.includes(d.id_post)) {
      d["liked"] = 1;
    } else {
      d["liked"] = 0;
    }
  });

  dbconnection.release();
}

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

const getPosts = async (id_user, id_hastag) => {
  const dbconnection = await pool.connect();
  let props = `order by upload_date DESC`
  if (id_hastag) {
    props = `join relation_post_to_hastags rpth  using(id_post) where id_hastag = ${id_hastag}`
  }
  let data = await dbconnection.query(queryPost(queryPostDefault)(props));

  await mapLikes(data.rows, id_user)
  dbconnection.release()
  return data;
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
  const current_time = getDateTimeNow();

  let values = [];
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
  setPosts,
};
