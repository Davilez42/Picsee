const pool = require("./connection");

const getHastags = async () => {
  const dbconnection = await pool.getConnection(); // obtengo una conexion

  const data =
    await dbconnection.execute(`SELECT count(id_post) as used,id_hastag,name
                                                from relation_post_to_hastags
                                                join hastags using (id_hastag)
                                                group by id_hastag 
                                                order by used desc
                                              `);
  dbconnection.release();
  return data[0];
};

const setHastags = async (hastags) => {
  const dbconnection = await pool.getConnection(); // obtengo una conexion

  let hastags_bd = await dbconnection.execute(
    "select id_hastag, name from hastags"
  );
  hastags_bd = hastags_bd[0].map((d) => d.name.toLowerCase());
  let values = [];
  for (n of hastags) {
    if (!hastags_bd.includes(n.toLowerCase())) {
      values.push(`("${n}")`);
    }
  }

  if (values.length == 0) {
    return;
  }

  const data = await dbconnection.execute(
    `Insert Into hastags (name) values ${values.join(",")}`
  );
  dbconnection.release();
  return data;
};

const getIdHastagsByName = async (hastags) => {
  const dbconnection = await pool.getConnection(); // obtengo una conexion

  const data = await dbconnection.execute(
    `Select id_hastag from hastags where name in ("${hastags.join('","')}") `
  );
  dbconnection.release();
  return data[0].map((d) => d.id_hastag);
};

const setRelationHastags = async (id_posts, hastags) => {
  const dbconnection = await pool.getConnection(); // obtengo una conexion
  let ids = await getIdHastagsByName(hastags);
  let values = [];

  for (const id_post of id_posts) {
    for (const id_hastag of ids) {
      values.push(`(${id_post},${id_hastag})`);
    }
  }

  const data = await dbconnection.execute(
    `INSERT into relation_post_to_hastags (id_post,id_hastag) VALUES ${values.join(
      ","
    )}`
  );

  dbconnection.release();
  return data;
};

module.exports = {
  getHastags,
  setHastags,
  getIdHastagsByName,
  setRelationHastags,
};
