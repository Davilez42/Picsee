const handlerError = (req, res) => {

  res.status(404).render("info.ejs", { message: "🔍 La ruta Solicitada no existe ❗" });
};
module.exports = handlerError;
