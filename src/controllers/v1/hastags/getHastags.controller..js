const RepositorioHastags = require("../../../database/hastags.service");
const getHastags = async (req, res) => {
  // * controller for get current hastags
  
  try {
    const hastags = await RepositorioHastags.getHastags();
    return res.status(200).json({ hastags: hastags });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      messageError: "Internal server error, please try again later",
    });
  }
};

module.exports = getHastags;
