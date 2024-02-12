const { tagRepository, postRepository } = require("../../../database/dependencies.js");
const imageKitIio = require("../../../microservices/imageKit/imageKitIo.service.js");
const { IMAGE_KIT_CONFIG } = require("../../../../configs/config.js");
const imageModerator = require("../../../microservices/ImageModerator/imageModerator.js");
const errorHandler = require("../../../tools/errorHandler.js");

const uploadPostController = async (req, res) => {
  //* controller for upload image to cdn

  const { id_user } = req;
  try {
    let { photos } = req.files;
    const tags = req.body.tags?.split(',') || []

    //console.log(tags);
    if (!photos.length) {
      photos = [photos]
    }
    //* verify images moderator
    for (const f of photos) {
      await imageModerator.verify(f)
    }

    const infoFilesInserted = await imageKitIio._upload(
      photos,
      IMAGE_KIT_CONFIG.images_folder_dest
    );

    const insertedIds = await postRepository.create(id_user, infoFilesInserted);

    if (tags.length > 0) {
      await tagRepository.create(insertedIds, tags);
    }

    res.status(200).json({
      images: [infoFilesInserted.map(i => i.url)]
    });
  } catch (e) {
    errorHandler(e, req, res)
  }
};

module.exports = uploadPostController;
