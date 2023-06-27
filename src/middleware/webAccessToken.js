const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateAccessToken = (data) => {
  return jwt.sign(data, process.env.KEY_SECRET, { expiresIn: "22h" });
};


const validateToken = (req, res, next) => {
    try {
        if(req.params.option=="relevants"){
            next()
            return
          } 
          const token = req.query.t_ken || req.headers["auth"];
          if (!token) {
            res.render('info.ejs',{message:"Acceso Denegado,No se meta donde no debe...deje de joder mka🤣"})
            return;
          }
          jwt.verify(token, process.env.KEY_SECRET, (err, user) => {
            if (err) {
              console.log("token vencido")
                return  res.render('info.ejs',{message:"Tu sesion ha caducado.. inicia sesion nuevamente 🤣"})
            } 
              //verifico el id_user del token entregado
            user  = jwt.decode(token)
            const id_user = req.params.id_user || req.query.id_user || req.headers["id"]
            if (user.id_user!=id_user){
                return  res.status(404).render('info.ejs',{message:"Acceso Denegado, Informacion trocada "})
            }
            next();
          
          });

    } catch (error) {
        return res.status(500).json({"messageError":`Error: ${error.message}`})
    } 
  
};

module.exports = {
  generateAccessToken,
  validateToken,
};
