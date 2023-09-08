const RepositoryPosts = require("../../../database/posts.service");
require("dotenv").config();

const getposts = async (req, res) => {
  //* controller for get posts

  const { filter } = req.params;
  const { id } = req.headers
  try {
    let posts = null;

    if (filter === "top") {
      posts = await RepositoryPosts.getPosts_Relevant();
    }
    if (filter === "currents") {
      posts = await RepositoryPosts.getPosts(id);

    }
    if (filter === "byhastag") {
      const id_hastag = req.query.hst;
      posts = await RepositoryPosts.getPosts(id, id_hastag);

    }

    if (filter === 'bysearch') {
      const { text } = req.query
      posts = await RepositoryPosts.getPosts(id, undefined, text)
    }
    return res.status(200).json({ posts });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      messageError: "Internal server error, please try again later",
    });
  }
};

module.exports = getposts;
