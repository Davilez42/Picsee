import NavBar from "../components/navbar/NavBar";
import { Outlet } from "react-router-dom";
import UploadPhotos from "../components/photos/UploadPhotosView";
import { useContext, useState } from "react";
import UserContext from "../context/userContext";

function Home() {
  const [visibleUploadBlock, setVisibleUploadBlock] = useState(false);
  const { logged } = useContext(UserContext);
  const openBlockUpload = () => {
    if (!logged) {
      return alert("Debes iniciar sesion para subir una foto");
    }
    setVisibleUploadBlock(true);
  };
  return (
    <>
      <div>
        <NavBar upload={openBlockUpload} />
        {visibleUploadBlock ? (
          <UploadPhotos setVisible={setVisibleUploadBlock} />
        ) : (
          <></>
        )}
        <Outlet />
      </div>
    </>
  );
}
export default Home;
