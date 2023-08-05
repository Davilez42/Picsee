const pool = require("./connection");

const getHastags = async () => {
  const dbconnection = await pool.connect(); // obtengo una conexion
  const data = await dbconnection.query(`SELECT count(r.id_post) as used , h.id_hastag , h.name
                                                from relation_post_to_hastags r
                                                join hastags  h using (id_hastag)
                                                group by h.id_hastag 
                                                order by used desc
                                              `);

  dbconnection.release();
  return data.rows;
};

const setHastags = async (id_posts, hastags) => {
  const dbconnection = await pool.connect(); // obtengo una conexion

  const hastags_bd = await dbconnection.query(
    "select id_hastag, name from hastags"
  );
  const map_db = hastags_bd.rows.map((h) => h.name);
  const to_insert = hastags
    .filter((d) => !map_db.includes(d.toLowerCase()))
    .map((h) => `('${h}')`);

  let ids = [];
  if (to_insert.length != 0) {
    const data = await dbconnection.query(
      `Insert Into hastags (name) values ${to_insert.join(
        ","
      )} RETURNING id_hastag`
    );
    ids = data.rows.map((h) => h.id_hastag);
  }

  let ids_relations = [...ids];

  hastags_bd.rows.forEach((e) => {
    if (hastags.includes(e.name)) {
      ids_relations.push(e.id_hastag);
    }
  });

  await setRelationHastags(ids_relations, id_posts);
  dbconnection.release();
  return;
};

const setRelationHastags = async (hastags, posts) => {
  const dbconnection = await pool.connect(); // obtengo una conexion
  let values = [];

  for (const id_p of posts) {
    for (const id_h of hastags) {
      values.push(`(${id_p},${id_h})`);
    }
  }
  const data = await dbconnection.query(
    `INSERT into relation_post_to_hastags (id_post,id_hastag) VALUES ${values.join(
      ","
    )}`
  );

  dbconnection.release();
};

module.exports = {
  getHastags,
  setHastags,
};
