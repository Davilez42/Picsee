const ImageKit = require("imagekit");
const { IMAGE_KIT_CONFIG } = require("../../../configs/config");
const imagekit = new ImageKit(IMAGE_KIT_CONFIG);

const delete_Images_Cdn = async (files) => {
  //* delete images from cdn services
  
  if (files.length == 0) {
    return;
  }
  files.forEach((i) => {
    if (i) {
      imagekit.deleteFile(i.id_cdn).catch((error) => {
        return error;
      });
    }
  });
};

module.exports = delete_Images_Cdn;
