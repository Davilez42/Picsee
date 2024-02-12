class TagRepository {
  constructor(pool) {
    this.pool = pool
  }
  async get() {
    const dbconnection = await this.pool.connect(); // obtengo una conexion
    const data = await dbconnection.query(`
        SELECT tag.id_tag, tag.name, count(psts.id_post) as totalUsed
        FROM tags tag
        left join posts_tags psts on psts.id_tag = tag.id_tag
        group by tag.id_tag, tag.name
        order by totalUsed DESC`);
    dbconnection.release();
    return data.rows;
  };

  async create(posts, tags) {
    tags = tags.map(d => d.trim().toLowerCase())
    const dbconnection = await this.pool.connect(); // obtengo una conexion
    const respdb = await dbconnection.query(
      `SELECT id_tag,name from tags WHERE name in ('${tags.join("','")}')`
    );
    let tags_posts = respdb.rows.map(t => t.id_tag)
    const tagsFound = respdb.rows.map(t => t.name)
    let toInsertTag = tags.filter(t => !tagsFound.includes(t))

    if (toInsertTag.length !== 0) {
      const respInsertDb = await dbconnection.query(`INSERT INTO tags (name) VALUES ('${toInsertTag.join("'),('")}') ON CONFLICT DO nothing returning id_tag`)
      respInsertDb.rows.forEach(t => {
        tags_posts.push(t.id_tag)
      });
    }

    let values = []
    for (const id_p of posts) {
      for (const id_h of tags_posts) {
        values.push(`(${id_p},${id_h})`);
      }
    }
    await dbconnection.query(
      `INSERT into posts_tags (id_post,id_tag) VALUES ${values.join(
        ","
      )}`
    );

    dbconnection.release();
    return;
  };

}

module.exports = TagRepository





