const dbconnection = require("./connection");

const getHastags = async () => {
  const resp =
    await dbconnection.execute(`SELECT count(id_post) as used,id_hastag,name
                                                from relation_post_to_hastags
                                                join hastags using (id_hastag)
                                                group by id_hastag 
                                                order by used desc
                                              `);
  return resp[0];
};

const setHastags = async (hastags) => {
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

  let consulta = `Insert Into hastags (name) values ${values.join(",")}`;
  return dbconnection.execute(consulta);
};

const getIdHastagsByName = async (hastags) => {
  const respuesta = await dbconnection.execute(
    `Select id_hastag from hastags where name in ("${hastags.join('","')}") `
  );
  return respuesta[0].map((d) => d.id_hastag);
};

const setRelationHastags = async (id_posts, hastags) => {
  let ids = await getIdHastagsByName(hastags);
  let values = [];
  
  for (const id_post of id_posts) {
    for (const id_hastag of ids) {
      values.push(`(${id_post},${id_hastag})`);
    }
  }

  console.log(ids);
  return dbconnection.execute(
    `INSERT into relation_post_to_hastags (id_post,id_hastag) VALUES ${values.join(
      ","
    )}`
  );
};

module.exports = {
  getHastags,
  setHastags,
  getIdHastagsByName,
  setRelationHastags,
};
