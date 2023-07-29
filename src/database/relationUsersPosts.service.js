const pool = require("./connection");
require("dotenv").config();

const insertRelation = async (id_post, id_user) => {
  const dbconnection = await pool.getConnection();

  try {
    await dbconnection.query(`INSERT INTO users_post_liked (id_post,id_user)
                        VALUES(${id_post},${id_user})`);
    dbconnection.release();
    return true;
  } catch (error) {
    if (error.code === process.env.DB_DUP_ENTRY) {
      await dbconnection.query(
        `DELETE FROM users_post_liked WHERE id_post = ${id_post} and id_user = ${id_user}`
      );
      dbconnection.release();
      return false;
    } else {
      return error;
    }
  }
};

module.exports = { insertRelation };
