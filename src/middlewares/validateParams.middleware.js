const validateIdUser = async (req, resp, next) => {
  const id_user =
    req.params.id_user || req.query.id_user || req.headers["id"] || req.id_user;
  try {
    if (req.params.filter == "top") {
      next();
      return;
    }
    if (!id_user || id_user.trim() === "") {
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
  const { username, password } = req.body;
  try {
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
  const { username, password, email, first_names, last_names } = req.body;
  try {
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

const validateFiles = (req, res, next) => {
  const { archivo } = req.files;
  try {
    if (!archivo) {
      throw new Error("Error: no se encuantra el archivo");
    }
    if (archivo.length > 4) {
      throw new Error("Error: maximo de archivos excedido");
    }
    next();
  } catch (e) {
    res.status(400).json({ messageError: e.message });
  }
};

const validateIdPost = (req, res, next) => {
  const { id_post } = req.params;
  try {
    if (!id_post) {
      throw new Error("Error: entradas incorrectas");
    }
    if (isNaN(parseInt(id_post))) {
      throw new Error("Error: Tipos de datos incorrectos");
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
  validateFiles,
  validateIdPost,
};
