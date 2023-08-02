const RepositoryPosts = require("../../../database/posts.service");
require("dotenv").config();

const getposts = async (req, res) => {
  //* controller for get posts

  const { filter } = req.params;
  const { id } = req.headers
  try {
    let posts = null;
    if (filter === "top") {
      const posts_relevants = await RepositoryPosts.getPosts_Relevant();

      posts = posts_relevants;
    }
    if (filter === "currents") {
      const posts_currents = await RepositoryPosts.getPosts(id);
      posts = posts_currents;
    }
    if (filter === "byhastag") {
      const id_hastag = req.query.hst;
      const posts_currents = await RepositoryPosts.getPosts(id, id_hastag);
      posts = posts_currents;
    }
    const data = { posts };

    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      messageError: "Internal server error, please try again later",
    });
  }
};

module.exports = getposts;
