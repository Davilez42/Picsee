const pool = require("./connection");
const serviceEncrypted = require("../tools/encrypted.tool");

const get_user_Loguin = async (username) => {
  const dbconnection = await pool.getConnection(); // obtengo una conexion

  const result = await dbconnection.query(`SELECT id_user,url,username,passwrd 
                                              from users 
                                              join avatars_users using(id_user)
                                              WHERE username = '${username}'`);
  dbconnection.release(); //termino de utilizar la conexion

  return result[0];
};

const insert_user = async (user) => {
  const dbconnection = await pool.getConnection(); // obtengo una conexion

  const password_encrypt = await serviceEncrypted.encrypted(user.password);

  const data = await dbconnection.execute(
    `Insert Into users (username,first_name,last_name,email,passwrd,recent_sesion) VALUES (?,?,?,?,?,?)`,
    [
      user.username,
      user.first_names,
      user.last_names,
      user.email,
      password_encrypt,
      "2023-01-02",
    ]
  );

  dbconnection.release();

  return data[0].insertId;
};

const delet_user = async (id_user) => {
  const dbconnection = await pool.getConnection(); // obtengo una conexion

  await dbconnection.execute(`DELETE from users where id_user = ${id_user}`);

  dbconnection.release();

  return;
};

const existUser = async (id_user) => {
  const dbconnection = await pool.getConnection(); // obtengo una conexion

  const data = await dbconnection.execute(
    `SELECT * from users where id_user = ${id_user}`
  );
  dbconnection.release();
  return data[0].length != 0;
};

module.exports = {
  get_user_Loguin,
  insert_user,
  delet_user,
  existUser,
};
