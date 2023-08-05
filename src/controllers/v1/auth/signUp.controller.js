const RepositorioUser = require("../../../database/users.service");
const RepositoryAvatarsUsers = require("../../../database/avatarsUsers.service.js");
const generateToken = require("../../../tools/generateToken.tool");
require("dotenv").config();

const signUp = async (req, res) => {
  //* controlador for register users

  const { username } = req.body;
  try {
    const insertId_user = await RepositorioUser.insert_user(req.body);

    await RepositoryAvatarsUsers.insertAvatar(insertId_user);

    const token = generateToken({ id_user: insertId_user, ...req.body });

    return res.status(200).json({
      succes: true,
      id_user: insertId_user,
      avatar: {
        url: process.env.DEFAULT_AVATAR_URL,
      },
      username: [true, username],
      password: true,
      token,
    });
  } catch (e) {

    if (e.code === process.env.DB_DUP_ENTRY) {
      const r = e.constraint.split("_")[1];
      return res.status(200).json({ succes: false, valFail: r });
    }

    return res.status(500).json({
      messageError: "Internal server error, please try again later",
    });
  }
};
module.exports = signUp;
