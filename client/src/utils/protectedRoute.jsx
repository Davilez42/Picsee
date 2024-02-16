import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
function ProtectedRoute() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(window.sessionStorage.getItem("session"));
    console.log(user);
    if (!user?.token) {
      navigate("/forms/sign/upload");
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
