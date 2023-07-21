const RepositorioPosts = require("../../../database/posts.service");
const RepositorioRelationUsersPosts = require("../../../database/relationUsersPosts.service");

const setlike = async (req, resp) => {
  try {
    if (req.params.id_post == undefined) {
      throw new Error("Error: entradas incorrectas");
    }
    const id_post = parseInt(req.params.id_post);
    if (isNaN(id_post)) {
      throw new Error("Error: Tipos de datos incorrectos");
    }
    const resultado = await RepositorioRelationUsersPosts.insertRelation(
      req.params.id_post,
      req.params.id_user
    );
    await RepositorioPosts.setLikePost(
      req.params.id_post,
      resultado ? "+" : "-"
    );
    return resp.sendStatus(200);
  } catch (rason) {
    if (rason.code === process.env.DB_CONNECTION_REFUSED) {
      return resp.status(500).json({
        messageError: "error: No se pudo conectar a la base de datos",
      });
    }
    console.log(rason.message);
    return resp.sendStatus(404);
  }
};

module.exports = setlike;
