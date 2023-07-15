const dbconnection = require("./db.service");
require("dotenv").config();

const insertAvatar = async (id_user, url = process.env.DEFAULT_AVATAR_URL) => {
  return await dbconnection.execute(
    `INSERT INTO avatars_users (id_user,url)  VALUES(${id_user},"${url}")`
  );
};

const getAvatar = async (id_user) => {
  const resp =
    await dbconnection.execute(`SELECT id_avatar,url,id_cdn from avatars_users
    where id_user = ${id_user}`);
  return resp[0][0];
};

const deleteAvatarByidAvatar = async (id_Avatar) => {
  return dbconnection.execute(
    `DELETE FROM avatars_users WHERE id_avatar = ${id_Avatar}`
  );
};

const updateAvatar = async (id_avatar, avatar) => {
  return await dbconnection.execute(
    `UPDATE avatars_users SET url='${avatar.url}', id_cdn='${avatar.id_cdn}' WHERE id_avatar=${id_avatar};`
  );
};

module.exports = {
  insertAvatar,
  getAvatar,
  updateAvatar,
  deleteAvatarByidAvatar,
};
