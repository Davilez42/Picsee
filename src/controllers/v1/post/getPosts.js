const RepositoryPosts = require("../../../database/posts.service");
require("dotenv").config();

const getposts = async (req, res) => {
  try {
    let posts = null;

    const filter = req.params.filter;
    if (filter === "relevants") {
      const posts_relevants = await RepositoryPosts.getPosts_Relevant();
      
      posts = posts_relevants;
    }
    if (filter === "currents") {
      const posts_currents = await RepositoryPosts.getPosts(req.headers["id"]);
      posts = posts_currents;
    }
    if (filter === "byhastag") {
      const id_hastag = req.query.hst;
      const posts_currents = await RepositoryPosts.getPostsByhastag(
        req.headers["id"],
        id_hastag
      );
      posts = posts_currents;
    }
    const data = { posts };

    return res.status(200).json(data);
  } catch (error) {
    if (error.code === process.env.DB_CONNECTION_REFUSED) {

      return res.status(500).json({
        messageError: "error: No se pudo conectar a la base de datos",
      });
    }
    res.status(400).json({messageError:error.message})
  }
};

module.exports = getposts;
