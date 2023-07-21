require("dotenv").config();
const RepositorioUser = require("../../../database/users.service");
const RepositorioImages = require("../../../database/images.service");
const RepositorioAvatarsUsers = require("../../../database/avatarsUsers.service");
const delete_Images_Cdn = require("../../../microservices/imageKit/deleteImages.service.js");

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

    await delete_Images_Cdn([
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

module.exports = delete_User;
