require("dotenv").config();
const RepositorioUser = require("../../../database/users.service");
const RepositorioImages = require("../../../database/images.service");
const RepositorioAvatarsUsers = require("../../../database/avatarsUsers.service");
const delete_Images_Cdn = require("../../../microservices/imageKit/deleteImages.service.js");

const delete_User = async (req, resp) => {
  //* controller for delete users

  const { id_user } = req.query;

  try {
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
  } catch (e) {
    if (e.code === process.env.DB_CONNECTION_REFUSED) {
      return resp.status(500).json({
        messageError: "Internal server error, please try again later",
      });
    }
    return resp.status(400).json({ messageError: e.message });
  }
};

module.exports = delete_User;
