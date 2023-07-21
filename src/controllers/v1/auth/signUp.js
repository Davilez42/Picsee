const RepositorioUser = require("../../../database/users.service");
const RepositoryAvatarsUsers = require("../../../database/avatarsUsers.service.js");
const generateToken = require("../../../tools/generateToken.tool");
require("dotenv").config();

const signUp = async (req, resp) => {
  try {
    const { username, password, email, first_names, last_names } = req.body;
    if (
      [username, first_names, last_names, email, password].includes(undefined)
    ) {
      throw new Error("Error: Entradas incorrectas");
    }

    [username, first_names, last_names, email, password].map((d) => {
      if (d.trim() === "") {
        throw new Error("Error: Porfavor suministre todos los campos ");
      }
    });

    if (password.toString().length < 9) {
      throw new Error(
        "Error:El campo de la contraseña debe ser mayor o igual a 9"
      );
    }

    const insertId_user = await RepositorioUser.insert_user(req.body);

    RepositoryAvatarsUsers.insertAvatar(insertId_user);

    const token = generateToken({ id_user: insertId_user, ...req.body });

    return resp.status(200).json({
      succes: true,
      id_user: insertId_user,
      avatar: {
        url: process.env.DEFAULT_AVATAR_URL
      },
      username: [true, username],
      password: true,
      token,
    });
  } catch (rason) {
    if (rason.code === process.env.DB_DUP_ENTRY) {
      const r = rason.sqlMessage.split(" ").pop().slice(1, -1).split(".")[1];
      return resp.status(200).json({ succes: false, valFail: r });
    }
    if (rason.code === process.env.DB_CONNECTION_REFUSED) {
      return resp.status(500).json({
        messageError: "error: No se pudo conectar a la base de datos",
      });
    }
    return resp.status(400).json({ messageError: rason.message });
  }
};
module.exports = signUp;
