const handlerError = (err, req, res) => {

  /*   if (err) {
      //console.log(err.message)
    }
   */
  res.status(404).render("info.ejs", { message: "🔍 La ruta Solicitada no existe ❗" });
};
module.exports = handlerError;
