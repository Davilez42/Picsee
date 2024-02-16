import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useUser from "../../hooks/useUser";
import UserContext from "../../context/userContext";

function Signup() {
  const { redirect } = useParams();
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [first_names, setFirst_names] = useState("");
  const [last_names, setLast_names] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const { setLogged } = useContext(UserContext);
  const navigate = useNavigate();
  const { create } = useUser();
  const registerHandler = () => {
    setErrorMessage("");
    if (
      [last_names, first_names, email, username, password1, password2].some(
        (d) => d.trim() === ""
      )
    ) {
      return setErrorMessage("Por favor, rellene los campos obligatorios");
    }
    if (password1 !== password2) {
      return setErrorMessage("Las contraseñas no coinciden");
    }
    setLoader(true);
    create(
      (data, err) => {
        setLoader(false);
        if (err) {
          return setErrorMessage(err);
        }
        if (redirect) {
          navigate(`/${redirect}`);
        } else {
          navigate("/");
        }
        setLogged(true);
        window.sessionStorage.setItem("session", JSON.stringify(data));
      },
      {
        username,
        last_names,
        first_names,
        email,
        password: password1,
      }
    );
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="container-forms__form-signup form-signup">
        <div className="form-signup__tittle">
          <h2>Registro</h2>
        </div>
        <div className="form-signup__inputs-line">
          <input
            onChange={(e) => {
              setFirst_names(e.target.value);
            }}
            id="registro-nombres-input"
            className="form-signup__input-first-names input-form"
            type="text"
            placeholder="Nombre *"
          />

          <input
            onChange={(e) => {
              setLast_names(e.target.value);
            }}
            id="registro-apellidos-input"
            className="form-signup__input-last-names input-form"
            type="text"
            placeholder="apellidos *"
          />
        </div>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          id="registro-usuario-input"
          className="form-signup__input-username input-form"
          type="text"
          placeholder="Nombre de usuario *"
        />
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          id="registro-correo-input"
          className="form-signup__input-email input-form"
          type="email"
          placeholder="ejemplo@correo.co *"
        />

        <input
          onChange={(e) => {
            setPassword1(e.target.value);
          }}
          id="registro-contraseña-input"
          className="form-signup__input-password input-form"
          type="password"
          placeholder="Contraseña minimo 8 caracteres *"
        />
        <input
          onChange={(e) => {
            setPassword2(e.target.value);
          }}
          id="registro-contraseña-input-2"
          className="form-signup__input-confirm-password input-form"
          type="password"
          placeholder="confirmar contraseña *"
        />
        {loader ? (
          <div className="effect-loader">
            <svg className="ring" viewBox="25 25 50 50" stroke-width="5">
              <circle cx="50" cy="50" r="20" />
            </svg>
          </div>
        ) : (
          <></>
        )}
        <div id="container_error" className="form-sign__container-error">
          {errorMessage}
        </div>
        <div
          onClick={registerHandler}
          id="btn_registro"
          className="form-signup__btn-signup btn-form btn--green"
        >
          Registrarse
        </div>
        <div className="info">
          <p>
            Ya tienes una cuenta ?
            <NavLink className={"nav-link"} to={"/forms/sign"}>
              {" "}
              <b>Inicia aqui</b>
            </NavLink>
          </p>
        </div>
        <div className="form-signup__info">
          Al unirte aceptas los terminos y condiciones ®
        </div>
      </div>
    </>
  );
}

export default Signup;
