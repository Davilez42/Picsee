const pool = require("./connection");
const serviceEncrypted = require("../tools/encrypted.tool");

const get_user_Loguin = async (username) => {
  const dbconnection = await pool.connect(); // obtengo una conexion

  const data = await dbconnection.query(`SELECT id_user,url,username,passwrd 
                                              from users 
                                              join avatars_users using(id_user)
                                              WHERE username = '${username}'`);
  dbconnection.release(); //termino de utilizar la conexion
  return data.rows[0];
};

const insert_user = async (user) => {
  const dbconnection = await pool.connect(); // obtengo una conexion

  const password_encrypt = await serviceEncrypted.encrypted(user.password);
  try {


    const data = await dbconnection.query(
      `INSERT INTO users (username,first_name,last_name,email,passwrd,recent_sesion) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id_user`,
      [
        user.username,
        user.first_names,
        user.last_names,
        user.email,
        password_encrypt,
        "2023-01-02",
      ]
    );
    return data.rows[0].id_user;
  } catch (e) {
    throw e
  }
  finally {
    dbconnection.release(); //termino de utilizar la conexion
  }
};

const delet_user = async (id_user) => {
  const dbconnection = await pool.connect(); // obtengo una conexion

  await dbconnection.query(`DELETE from users where id_user = ${id_user}`);

  dbconnection.release();
};

const existUser = async (id_user) => {
  const dbconnection = await pool.connect(); // obtengo una conexion

  const data = await dbconnection.query(
    `SELECT * from users where id_user = ${id_user}`
  );

  dbconnection.release();
  return data.rows.length != 0;
};

module.exports = {
  get_user_Loguin,
  insert_user,
  delet_user,
  existUser,
};
