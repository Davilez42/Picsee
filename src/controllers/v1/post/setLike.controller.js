const RepositorioPosts = require("../../../database/posts.service");
const RepositorioRelationUsersPosts = require("../../../database/relationUsersPosts.service");

const setlike = async (req, resp) => {
  //* controller for set like posts
  const { id_post, id_user } = req.params;
  try {
    const resultado = await RepositorioRelationUsersPosts.insertRelation(
      id_post,
      id_user
    );
    await RepositorioPosts.setLikePost(id_post, resultado ? "+" : "-");
    
    return resp.sendStatus(200);
  } catch (e) {
    if (e.code === process.env.DB_CONNECTION_REFUSED) {
      return resp.status(500).json({
        messageError: "Internal server error, please try again later",
      });
    }
    return resp.sendStatus(404);
  }
};

module.exports = setlike;
