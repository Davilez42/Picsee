const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateToken = (req, res, next) => {
  try {
    if (req.params.filter === "top") {
      next();
      return;
    }
    const token = req.query.t_ken || req.headers["auth"];

    if (!token) {
      res.render("info.ejs", {
        message:
          "Acceso Denegado, No se meta donde no debe...deje de joder mka🤣",
      });
      return;
    }

    jwt.verify(token, process.env.JWT_KEY_SECRET, (err, user) => {
      if (err) {
        res.render("info.ejs", {
          message: "Tu sesion ha caducado.. inicia sesion nuevamente",
        });
        return;
      }
      //verifico el id_user del token entregado
      user = jwt.decode(token);
      const id_user =
        req.params.id_user || req.query.id_user || req.headers["id"];
      if (user.id_user !== parseInt(id_user)) {
        res.status(404).render("info.ejs", {
          message: "Acceso Denegado, Informacion trocada ",
        });
        return;
      }

      next();
    });
  } catch (e) {
    return res.status(500).json({ messageError: `Error: ${e.message}` });
  }
};

module.exports = {
  validateToken,
};
