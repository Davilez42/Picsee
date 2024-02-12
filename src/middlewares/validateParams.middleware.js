const InvalidBody = require("../exceptions/InvalidBody");
const errorHandler = require("../tools/errorHandler");

const validateSign = (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (username.trim() === "" || password.toString().length == 0) {
      throw new InvalidBody(
        "Los campos no pueden estar vacios"
      );
    }
    if (password.toString().length < 9) {
      throw new InvalidBody(
        "la contraseña debe ser mayor o igual a 9"
      );
    }
    next();
  } catch (e) {
    errorHandler(e, req, res)
  }
};

const validateCreateUser = (req, res, next) => {
  const { username, password, email, first_names, last_names } = req.body;
  try {
    if (
      [username, first_names, last_names, email, password].includes(undefined)
    ) {
      throw new InvalidBody('Faltan keys');
    }

    [username, first_names, last_names, email, password].forEach((d) => {
      if (d.trim() === "") {
        throw new InvalidBody(
          "Los campos no pueden estar vacios"
        );
      }
    });

    const regex_ = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex_.test(email)) {
      throw new InvalidBody('El correo electronico no es correcto')
    }

    if (password.toString().length < 9) {
      throw new InvalidBody(
        "la contraseña debe ser mayor o igual a 9"
      );
    }
    next();
  } catch (e) {
    errorHandler(e, req, res)
  }
};

const validateFiles = (req, res, next) => {
  try {
    let photos = req.files?.photos
    if (!photos) {
      throw new InvalidBody("No se encuentran fotos para subir");
    }

    if (!photos.length) {
      photos = [photos]
    }
    if (photos.length > 5) {
      throw new InvalidBody('Solo se puede un maximo de 5 fotos')
    }

    let sizeTotal = 0
    for (let f of photos) {
      sizeTotal += f.size
      if (!['image/jpg', 'image/png', 'image/jpeg'].includes(f.mimetype)) {
        throw new InvalidBody('Solo debe de subir archivos de tipo jpg, png, jpeg')
      }
      if (sizeTotal > 10000000) {
        throw new Error('Error: El tamaño supera 10mb')
      }
    }
    next()
  } catch (e) {
    errorHandler(e, req, res)
  }
};

const validateIdPost = (req, res, next) => {
  const { id_post } = req.params;
  try {
    if (!Number.isInteger(parseInt(id_post))) {
      throw new InvalidBody("Formato de Id incorrecto");
    }
    next();
  } catch (e) {
    errorHandler(e, req, res)
  }
};


const validateUpdateUser = (req, res, next) => {
  try {
    const keys_valids = ['city', 'country', 'first_name', 'last_name']

    for (const k in req.body) {
      if (!keys_valids.includes(k)) {
        throw new InvalidBody('propiedades incorrectas por favor suministre las propiedades correctas')
      }
      if (req.body[k].trim() === '') {
        throw new InvalidBody('No deben de haber propiedades con datos vacios')
      }
    }


    next()
  } catch (e) {
    errorHandler(e, req, res)
  }
}

module.exports = {
  validateSign,
  validateCreateUser,
  validateFiles,
  validateIdPost,
  validateUpdateUser
};
