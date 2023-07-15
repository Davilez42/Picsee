const jwt = require("jsonwebtoken");
const userServices = require("../services/users.service");
const avatarUserServices = require("../services/avatarsUsers.service");
const genareteToken = require("../services/generateToken.service");
const { json } = require("express");
require("dotenv").config();
const authUser = async (req, res) => {
  try {
    const { credential, g_csrf_token } = req.body;

    if (!credential) {
      return res.status(400).json({ message: "params is incorrect!" });
    }


    const { name, email, picture } = jwt.decode(credential,process.env.SECRET_KEY_GOOGLE);

    let user_ = await userServices.get_user_Loguin(name);

    const user = {
      username: name,
      email: email,
      first_names: " ",
      last_names: " ",
      password: "true",
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

module.exports = { authUser };
