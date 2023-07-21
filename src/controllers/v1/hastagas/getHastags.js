const RepositorioHastags = require("../../../database/hastags.service");
const getHastags = async (req, resp) => {
  try {
    const hastags = await RepositorioHastags.getHastags();
    return resp.status(200).json({ hastags: hastags });
  } catch (rason) {
    if (rason.code === process.env.DB_CONNECTION_REFUSED) {
      return resp.status(500).json({
        messageError: "error: No se pudo conectar a la base de datos",
      });
    }
  }
};

module.exports = getHastags
