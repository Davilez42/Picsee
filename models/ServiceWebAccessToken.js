const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateAccessToken = (data) => {
  return jwt.sign(data, process.env.KEY_SECRET, { expiresIn: "22h" });
};

const validateToken = (req, res, next) => {
  console.log(req.params.option)
  if(req.params.option=="relevants"){
    next()
    return
  } 

  const token = req.query.t_ken || req.headers["auth"];
  console.log("TOKEN EN SERVIDOR",token)
  if (!token) {
    res.render('info.ejs',{message:"Acceso Denegado,No se meta donde no debe...deje de joder mka🤣"})
    return;
  }

  jwt.verify(token, process.env.KEY_SECRET, (err, user) => {
    if (err) {
      console.log("token vencido")
      res.render('info.ejs',{message:"Tu sesion ha caducado.. inicia sesion nuevamente 🤣"})
    } else {
      next();
    }
  });
};

module.exports = {
  generateAccessToken,
  validateToken,
};
