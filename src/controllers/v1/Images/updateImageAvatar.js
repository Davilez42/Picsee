const RepositorioAvatarsUsers = require("../../../database/avatarsUsers.service.js");
const delete_Images_Cdn = require("../../../microservices/imageKit/deleteImages.service.js");
const upload_Images_Cdn = require("../../../microservices/imageKit/uploadImages.service.js");
const { IMAGE_KIT_CONFIG } = require("../../../../configs/configDevops");
const updateImageAvatar = async (req, resp, next) => {
  try {
    const data = req.params;
    const id_user = data.id_user;
    const archivo = req.files.archivo;
    if (!archivo) {
      throw new Error("Error: no se encuantra el archivo");
    }

    if (id_user == undefined || archivo == undefined) {
      throw new Error("Error: entradas invalidas");
    }
    if (isNaN(parseInt(id_user))) {
      throw new Error("Error: El id es incorrecto");
    }
    const avatar = await RepositorioAvatarsUsers.getAvatar(id_user);

    if (avatar.id_cdn != null) {
      await delete_Images_Cdn([{ id_cdn: avatar.id_cdn }]);
    } // elimino el avatar el cdn
    const data_res = await upload_Images_Cdn(
      [{ data: archivo.data, name: archivo.name }],
      IMAGE_KIT_CONFIG.avatars_folder_dest
    );

    console.log("respuesta: ", data_res);

    await RepositorioAvatarsUsers.updateAvatar(avatar.id_avatar, {
      url: data_res[0].url,
      id_cdn: data_res[0].id_cdn,
    });

    return resp.status(200).json({ url: data_res[0].url });
  } catch (error) {
    if (error.code === process.env.DB_CONNECTION_REFUSED) {
      return resp.status(500).json({
        messageError: "error: No se pudo conectar a la base de datos",
      });
    }
    return resp.status(400).json({ messageError: error.message });
  }
};

module.exports = updateImageAvatar;
