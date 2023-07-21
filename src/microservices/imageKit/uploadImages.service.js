const ImageKit = require("imagekit");
const { IMAGE_KIT_CONFIG } = require("../../../configs/configDevops");
const imagekit = new ImageKit(IMAGE_KIT_CONFIG);

const upload_Images_Cdn = async (files,path) => {
  let images_cdn = [];
  for (let i = 0; i < files.length; i++) {
    await imagekit
      .upload({
        file: files[i].data,
        fileName: files[i].name,
        folder:path
      })
      .then((r) => {
        images_cdn.push({ url: r.url, id_cdn: r.fileId });
      })
      .catch((er) => {
        console.log("Error:", er);
      });
  }
  return images_cdn;
};

module.exports = upload_Images_Cdn;
