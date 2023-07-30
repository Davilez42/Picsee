const RepositorioPost = require("../../../database/posts.service.js");
const RepositorioImages = require("../../../database/images.service.js");
const RepositorioHastags = require("../../../database/hastags.service.js");
const upload_Images_Cdn = require("../../../microservices/imageKit/uploadImages.service.js");
const { IMAGE_KIT_CONFIG } = require("../../../../configs/config.js");
const uploadImage = async (req, res) => {
  //* controller for upload image to cdn

  const { id_user } = req.params;
  let files = req.files.archivo;
  let hastags = req.headers.hastags.split(",");

  try {
    if (hastags.length == 1 && hastags[0].length == 0) {
      hastags = null;
    }
    if (!files.length) {
      files = [files];
    }
    const id_images_cdn = await upload_Images_Cdn(
      files,
      IMAGE_KIT_CONFIG.images_folder_dest
    );

    const ids_image = await RepositorioImages.setImages(id_images_cdn);

    const id_posts = await RepositorioPost.setPosts(id_user, ids_image, 1);

    if (hastags != null) {
      await RepositorioHastags.setHastags(id_posts,hastags);
    }

    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      messageError: "Internal server error, please try again later",
    });
  }
};

module.exports = uploadImage;
