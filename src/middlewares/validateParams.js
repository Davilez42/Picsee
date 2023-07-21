const validateIdUser = async (req, resp, next) => {
  const id_user =
    req.params.id_user || req.query.id_user || req.headers["id"] || req.id_user;
  try {
    if (req.params.filter == "relevants") {
      next();
      return;
    }
    if (id_user == undefined || id_user.trim() === "") {
      throw new Error("Error: Los parametros son incorrectos ");
    }
    if (isNaN(parseInt(id_user))) {
      throw new Error("Error: Tipo de datos incorrectos");
    }
    next();
  } catch (e) {
    return resp.status(400).json({ messageError: e.message });
  }
};

const validateSignUser = (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (username.trim() === "" || password.toString().length == 0) {
      throw new Error(
        "Error: Campos vacios , Porfavor suministre todo los campos"
      );
    }
    if (password.toString().length < 9) {
      throw new Error(
        "Error: El campo de la contraseña debe ser mayor o igual a 9"
      );
    }
    next();
  } catch (e) {
    res.status(400).json({ messageError: e.message });
  }
};

const validateSignUpUser = (req, res, next) => {
  try {
    const { username, password, email, first_names, last_names } = req.body;
    if (
      [username, first_names, last_names, email, password].includes(undefined)
    ) {
      throw new Error("Error: Entradas incorrectas");
    }

    [username, first_names, last_names, email, password].forEach((d) => {
      if (d.trim() === "") {
        throw new Error("Error: Porfavor suministre todos los campos ");
      }
    });

    if (password.toString().length < 9) {
      throw new Error(
        "Error:El campo de la contraseña debe ser mayor o igual a 9"
      );
    }
    next();
  } catch (e) {
    res.status(400).json({ messageError: e.message });
  }
};

module.exports = {
  validateIdUser,
  validateSignUser,
  validateSignUpUser,
};
