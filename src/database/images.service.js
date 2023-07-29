const pool = require("./connection");

const setImages = async (data_images) => {
  const dbconnection = await pool.connect(); // obtengo una conexion

  let values = [];
  for (const i of data_images) {
    values.push(`('${i.url}','${i.id_cdn}')`);
  }

  const data = await dbconnection.query(
    `Insert into images (url_image,id_cdn) VALUES ${values.join(
      ","
    )} RETURNING id_image`
  );

  dbconnection.release();
  return data.rows.map((i) => i.id_image);
};


const deleteImages = async (id_user) => {
  const dbconnection = await pool.connect(); // obtengo una conexion

  const data = await dbconnection.query(
    `Select  i.id_cdn
    from posts p
    join images i on p.id_image = i.id_image
    where p.id_user = ${id_user}`
  );
  const ids_cdn = data.rows.map((d) => d.id_cdn);

  await dbconnection.query(
    `DELETE from images where id_cdn in ('${ids_cdn.join("','")}')`
  );

  dbconnection.release();

  return data.rows;
};

module.exports = { setImages, deleteImages };
