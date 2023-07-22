const generateTokenTool = require("../../tools/generateToken.tool");

const generateToken = async (req, res) => {
  //* controller for generate a token,TEST
  try {
    user_test = {
      id_user: 314,
    };
    const token = await generateTokenTool(user_test);
    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(500).json({ messageError: error.message });
  }
};

module.exports = generateToken;
