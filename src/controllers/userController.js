require("dotenv").config();
const RepositorioUser = require("../services/users.service");
const RepositorioImages = require("../services/images.service");
const RepositorioAvatarsUsers = require("../services/avatarsUsers.service");
const FileController = require("./fileController");
const fileController = new FileController();

const delete_User = async (req, resp) => {
  try {
    const { id_user } = req.query;
    //verifico si existe el usuario
    const user = await RepositorioUser.existUser(id_user);

    if (!user) {
      return resp.status(400).json({ messageError: "The user not exist" });
    }

    const images_to_delete = await RepositorioImages.getImagesByIdUser(id_user);

    const avatar_user = await RepositorioAvatarsUsers.getAvatar(id_user);

    await RepositorioUser.delet_user(id_user);
    await RepositorioImages.deleteImages(images_to_delete);

    await fileController.deleteFiles([
      ...images_to_delete,
      { id_cdn: avatar_user.id_cdn },
    ]);

    resp.sendStatus(204);
  } catch (rason) {
    if (rason.code === process.env.DB_CONNECTION_REFUSED) {
      return resp.status(500).json({
        messageError: "error: No se pudo conectar a la base de datos",
      });
    }
    console.log(rason);
    return resp.status(400).json({ messageError: rason.message });
  }
};
const setPreInfo = async (req, resp) => {
  try {
    //TODO
    console.log(req.body);
  } catch (error) {}
};

module.exports = { delete_User, setPreInfo };
