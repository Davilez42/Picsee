const dbconnection = require("./connection");
const getDateTimeNow = require("../tools/dateTime.tool");
const serviceEncrypted = require("../tools/encrypted.tool");

const get_user_Loguin = async (username) => {
  const result = await dbconnection.query(`SELECT id_user,url,username,passwrd 
                                            from users 
                                            join avatars_users using(id_user)
                                            WHERE username = '${username}'`);
  
  return result[0];
};

const insert_user = async (user) => {
  const password_encrypt = await serviceEncrypted.encrypted(user.password);
  return await dbconnection
    .execute(
      `Insert Into users (username,first_name,last_name,email,passwrd,recent_sesion) VALUES (?,?,?,?,?,?)`,
      [
        user.username,
        user.first_names,
        user.last_names,
        user.email,
        password_encrypt,
        "2023-01-02",
      ]
    )
    .then((data) => data[0].insertId);
};

const delet_user = async (id_user) => {
  return dbconnection.execute(`DELETE from users where id_user = ${id_user}`);
};

const existUser = async (id_user) => {
  const resp = await dbconnection.execute(
    `SELECT * from users where id_user = ${id_user}`
  );
  return resp[0].length != 0;
};

module.exports = {
  get_user_Loguin,
  insert_user,
  delet_user,
  existUser,
};
