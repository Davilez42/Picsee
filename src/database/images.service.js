const pool = require("./connection");

const setImages = async (data_images) => {
  const dbconnection = await pool.getConnection(); // obtengo una conexion

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
  dbconnection.release();
  return ids;
};

const getImagesById = async (user) => {
  const dbconnection = await pool.getConnection(); // obtengo una conexion

  const data = await dbconnection.execute(
    `Select  concat( i.id_image,"_",i.name,".", i.format_)  AS f_name 
                      from posts p
                      join images i on p.id_image = i.id_image
                      where p.id_user = ${user}`
  );

  dbconnection.release();
  return data[0];
};
const getImagesByIdUser = async (user) => {
  const dbconnection = await pool.getConnection(); // obtengo una conexion

  const data = await dbconnection.execute(
    `Select id_cdn
                        from posts p
                        join images i on p.id_image = i.id_image
                        where p.id_user = ${user}`
  );

  dbconnection.release();

  return data[0];
};

const deleteImages = async (images) => {
  const dbconnection = await pool.getConnection(); // obtengo una conexion

  if (images.length == 0) {
    return;
  }

  let consulta = [];
  for (const nma of images) {
    consulta.push(nma.id_cdn);
  }
  const data = await dbconnection.execute(
    `DELETE from images where id_cdn in ("${consulta.join('","')}")`
  );

  dbconnection.release();
  return data;
};

module.exports = { setImages, getImagesById, deleteImages, getImagesByIdUser };
