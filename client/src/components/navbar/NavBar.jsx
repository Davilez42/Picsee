import { useEffect, useState, useContext } from "react";
import "./navbar.css";
import UserContext from "../../context/userContext";
import { NavLink, useNavigate } from "react-router-dom";
function NavBar({ upload }) {
  const [search, setSearch] = useState("");
  const { logged, avatar } = useContext(UserContext);

  const navigate = useNavigate();
  useEffect(() => {}, []);
  return (
    <>
      <header className="nav-bar">
        <NavLink to={"/"} className="nav-bar__container-app-icon">
          <img
            src="https://ik.imagekit.io/picmont/icons/sendPic.png?updatedAt=1687206842790"
            className="nav-bar__app-icon"
            alt=""
          />
        </NavLink>

        <NavLink to={"/"} className="nav-bar__app-name nav-link" href="/#">
          <p>Picsee</p>
        </NavLink>

        <div className="nav-bar__container-search">
          <input
            className="nav-bar__input-search"
            type="search"
            name=""
            placeholder="busca algo"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <img
            className="nav-bar_icon_search"
            src="https://ik.imagekit.io/picmont/icons/icon_serch.png?updatedAt=1687206842901"
            alt=""
            onClick={() => {
              navigate(`/query/${search}`);
            }}
          />
        </div>
        <div className="nav-bar__menu menu">
          <ul className="menu__list-items">
            {!logged ? (
              <li className="menu__item-about item">
                <NavLink className={"nav-link"} to={"/forms/sign"}>
                  Inicia sesion
                </NavLink>
              </li>
            ) : (
              <></>
            )}
            <li className="menu__item-about item">
              <div
                onClick={() => {
                  upload();
                }}
                className="menu__btn-upload-post nav-link"
              >
                Subir imagen
              </div>
            </li>
          </ul>
        </div>

        {avatar !== "" ? (
          <div className="nav-bar__container-avatar">
            <img id="avatar" className="nav-bar__avatar" src={avatar} alt="" />
          </div>
        ) : (
          <></>
        )}
      </header>
    </>
  );
}

export default NavBar;
