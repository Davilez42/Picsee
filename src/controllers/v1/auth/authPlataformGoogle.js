const jwt = require("jsonwebtoken");
const userServices = require("../../../database/users.service");
const avatarUserServices = require("../../../database/avatarsUsers.service");
const genareteToken = require("../../../tools/generateToken.tool");
require("dotenv").config();

const authPlatformGoogle = async (req, res) => {
  try {
    console.log(req.body);
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: "params is incorrect!" });
    }
    const { name, email, picture } = jwt.decode(
      credential,
      process.env.SECRET_KEY_GOOGLE
    );

    let user_ = await userServices.get_user_Loguin(name);
    const user = {
      username: name,
      email: email,
      first_names: " ",
      last_names: " ",
      password: "true",
      avatar: { url: picture },
    };

    if (!user_[0]) {
      const insert_id = await userServices.insert_user(user);
      avatarUserServices.insertAvatar(insert_id, picture); //inserto avatar
      user.id_user = insert_id;
    }

    if (!user.id_user) {
      user.id_user = user_[0].id_user;
    }
    user.username = [true, name];

    const token = genareteToken(user);

    res.status(200).json({ token, ...user });
  } catch (error) {
    res.status(500).json({ messageError: error.message });
  }
};

module.exports = authPlatformGoogle;
