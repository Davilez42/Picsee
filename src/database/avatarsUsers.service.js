const pool = require("./connection");
require("dotenv").config();

const insertAvatar = async (id_user, url = process.env.DEFAULT_AVATAR_URL) => {
  console.log(id_user);
  const dbconnection = await pool.connect(); // obtengo una conexion
  const data = await dbconnection.query(
    `INSERT INTO avatars_users (id_user,url)  VALUES(${id_user},'${url}')`
  );
  dbconnection.release();
  return data;
};

const getAvatar = async (id_user) => {
  const dbconnection = await pool.connect(); // obtengo una conexion
  const data =
    await dbconnection.query(`SELECT id_avatar,url,id_cdn from avatars_users
    where id_user = ${id_user}`);
  dbconnection.release();
  return data.rows[0];
};

const deleteAvatarByidAvatar = async (id_Avatar) => {
  const dbconnection = await pool.connect(); // obtengo una conexion
  const data = await dbconnection.query(
    `DELETE FROM avatars_users WHERE id_avatar = ${id_Avatar}`
  );
  dbconnection.release();
  return data;
};

const updateAvatar = async (id_avatar, avatar) => {
  const dbconnection = await pool.connect(); // obtengo una conexion
  const data = await dbconnection.query(
    `UPDATE avatars_users SET url='${avatar.url}', id_cdn='${avatar.id_cdn}' WHERE id_avatar=${id_avatar};`
  );
  dbconnection.release();
  return data;
};

module.exports = {
  insertAvatar,
  getAvatar,
  updateAvatar,
  deleteAvatarByidAvatar,
};
