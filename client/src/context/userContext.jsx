/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserContextProvider(props) {
  const [logged, setLogged] = useState(false);
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    const user = JSON.parse(window.sessionStorage.getItem("session"));
    if (user) {
      setLogged(true);
      setAvatar(user.url_avatar);
    }
  });

  return (
    <UserContext.Provider value={{ logged, avatar, setLogged }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
