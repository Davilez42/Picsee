const RepositoryPosts = require("../../../database/posts.service");
require("dotenv").config();

const getposts = async (req, res) => {
  //* controller for get posts 

  const {filter} = req.params;

  try {
    let posts = null;
    if (filter === "top") {
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
  } catch (e) {
    if (e.code === process.env.DB_CONNECTION_REFUSED) {
      return res.status(500).json({
        messageError: "Internal server error, please try again later",
      });
    }
    res.status(400).json({ messageError: e.message });
  }
};

module.exports = getposts;