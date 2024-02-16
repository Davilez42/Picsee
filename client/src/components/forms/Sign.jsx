import "./forms.css";
import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import UserContext from "../../context/userContext";
function Sign() {
  const { redirect } = useParams();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setLogged } = useContext(UserContext);
  const navigate = useNavigate();
  const { sign } = useUser();

  useEffect(() => {}, []);

  const signHandler = () => {
    setErrorMessage("");
    if (user.trim() === "" || password.trim() === "") {
      return setErrorMessage("Asegurate de llenar todos los campos");
    }
    setLoader(true);
    sign(
      (user, err) => {
        setLoader(false);
        if (err) {
          return setErrorMessage(err);
        }
        setLoader(false);
        if (redirect) {
          navigate(`/${redirect}`);
        } else {
          navigate("/");
        }
        setLogged(true);
        window.sessionStorage.setItem("session", JSON.stringify(user));
      },
      { username: user, password }
    );
  };

  return (
    <>
      <div className="container-forms__form-sign form-sign">
        <div className="form-sign__titulo">
          <h2>Inicia sesion</h2>
        </div>

        <input
          id="login-username-input"
          onChange={(event) => {
            setUser(event.target.value);
          }}
          className="form_sign__input-username input-form"
          type="text"
          placeholder="usuario"
        />
        <input
          id="login-password-input"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          className="form_sign__input-password input-form"
          type="password"
          placeholder="contraseña"
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
          onClick={() => {
            signHandler();
          }}
          className="form-sign__btn-sign btn-form btn--bg_orange"
          id="btn"
        >
          iniciar Sesion
        </div>

        <GoogleLogin />

        <div className="info">
          <p>
            ¿ No tienes una cuenta ?
            <b>
              <NavLink className={"nav-link"} to={"/forms/signup"}>
                {" "}
                Registrate aqui
              </NavLink>
            </b>
          </p>
        </div>
      </div>
    </>
  );
}

export default Sign;
