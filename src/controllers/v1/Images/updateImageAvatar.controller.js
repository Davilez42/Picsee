const RepositorioAvatarsUsers = require("../../../database/avatarsUsers.service.js");
const delete_Images_Cdn = require("../../../microservices/imageKit/deleteImages.service.js");
const upload_Images_Cdn = require("../../../microservices/imageKit/uploadImages.service.js");
const { IMAGE_KIT_CONFIG } = require("../../../../configs/configDevops.js");
const updateImageAvatar = async (req, resp, next) => {
  //* controller for update avatar

  const { id_user } = req.params;
  const { archivo } = req.files;

  try {
    const avatar = await RepositorioAvatarsUsers.getAvatar(id_user);
    if (avatar.id_cdn != null) {
      await delete_Images_Cdn([{ id_cdn: avatar.id_cdn }]);
    }

    const data_res = await upload_Images_Cdn(
      //? delete images from cdn
      [{ data: archivo.data, name: archivo.name }],
      IMAGE_KIT_CONFIG.avatars_folder_dest
    );

    await RepositorioAvatarsUsers.updateAvatar(avatar.id_avatar, {
      url: data_res[0].url,
      id_cdn: data_res[0].id_cdn,
    });

    return resp.status(200).json({ url: data_res[0].url });
  } catch (error) {
    if (error.code === process.env.DB_CONNECTION_REFUSED) {
      return resp.status(500).json({
        messageError: "Internal server error, please try again later",
      });
    }
    return resp.status(400).json({ messageError: error.message });
  }
};

module.exports = updateImageAvatar;
