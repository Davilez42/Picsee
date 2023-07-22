const encryptedTool = require("../../../tools/encrypted.tool");
const generateTokenTool = require("../../../tools/generateToken.tool");

const RepositorioUser = require("../../../database/users.service");
require("dotenv").config();

const sign = async (req, res) => {
  //* Controlador for login user

  const { username, password } = req.body;
  try {
    const user_bd = await RepositorioUser.get_user_Loguin(username);
    if (user_bd.length == 0) {
      return res.status(200).json({ username: [false, username] });
    }
    if (await encryptedTool.compare_(user_bd[0].passwrd, password)) {
      const data = {
        id_user: user_bd[0].id_user,
        avatar: { url: user_bd[0].url },
        username: [true, user_bd[0].username],
        password: true,
      };
      const access_token = generateTokenTool({
        id_user: data.id_user,
        username: user_bd.username,
      });
      data["token"] = access_token;
      return res.header("auth", access_token).json(data);
    }
    return res
      .status(200)
      .json({ username: [true, username], password: false });
  } catch (e) {
    if (e.code === process.env.DB_CONNECTION_REFUSED) {
      return res.status(500).json({
        messageError: "Internal server error, please try again later",
      });
    }
    return res.status(400).json({ messageError: e.message });
  }
};

module.exports = sign;
