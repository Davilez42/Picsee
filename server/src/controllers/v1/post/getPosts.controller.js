const { postRepository } = require("../../../database/dependencies");
const errorHandler = require('../../../tools/errorHandler')
require("dotenv").config();

const getPostsController = async (req, res) => {
  //* controller for get posts
  const { query, tag, cursor } = req.query;
  try {
    const posts = await postRepository.get({ expression: query, tag: tag, cursor });
    return res.status(200).json({ posts, cursor: posts[posts.length - 1]?.id_post });

  } catch (e) {
    errorHandler(e, req, res)
  }
};

module.exports = getPostsController;
