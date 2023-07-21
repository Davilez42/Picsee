const dbconnection = require("./connection");

const setImages = async (data_images) => {
  let ids = [];
  for (const i of data_images) {
    await dbconnection
      .execute(
        `Insert into images (url_image,id_cdn) VALUES ("${i.url}","${i.id_cdn}") `
      )
      .then(async (data) => {
        ids.push(data[0].insertId);
      });
  }

  return ids;
};

const getImagesById = async (user) => {
  return dbconnection
    .execute(
      `Select  concat( i.id_image,"_",i.name,".", i.format_)  AS f_name 
                      from posts p
                      join images i on p.id_image = i.id_image
                      where p.id_user = ${user}`
    )
    .then((data) => data[0]);
};
const getImagesByIdUser = async (user) => {
  return dbconnection
    .execute(
      `Select id_cdn
                        from posts p
                        join images i on p.id_image = i.id_image
                        where p.id_user = ${user}`
    )
    .then((data) => data[0]);
};

const deleteImages = async (images) => {
  if (images.length == 0) {
    return;
  }

  let consulta = [];
  for (const nma of images) {
    consulta.push(nma.id_cdn);
  }

  consulta = `("${consulta.join('","')}")`;
  return dbconnection.execute(`DELETE from images where id_cdn in ${consulta}`);
};

module.exports = { setImages, getImagesById, deleteImages, getImagesByIdUser };
