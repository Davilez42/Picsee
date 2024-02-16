import NavBar from "../components/navbar/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import UploadPhotos from "../components/photos/UploadPhotosModal";
import { useContext, useState } from "react";
import UserContext from "../context/userContext";

function Home() {
  const [visibleUploadModal, setVisibleUploadModal] = useState(false);
  const { logged } = useContext(UserContext);
  const navigate = useNavigate();

  const openUploadModal = () => {
    if (!logged) {
      navigate("/forms/sign");
    } else {
      setVisibleUploadModal(true);
    }
  };
  return (
    <>
      <div>
        <NavBar openUploadModal={openUploadModal} />
        {visibleUploadModal ? (
          <UploadPhotos visibleModel={setVisibleUploadModal} />
        ) : (
          <></>
        )}
        <Outlet />
      </div>
    </>
  );
}
export default Home;
