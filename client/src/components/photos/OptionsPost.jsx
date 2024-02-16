import { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoMdArrowDown } from "react-icons/io";
import download from "js-file-download";
import usePosts from "../../hooks/usePosts";
import UserContext from "../../context/userContext";
// eslint-disable-next-line react/prop-types
function OptionsPost({ post }) {
  const [liked, setLiked] = useState(false);
  const { logged } = useContext(UserContext);
  const { setLike } = usePosts();
  const likeHandler = () => {
    if (!logged) {
      return alert("Debes de iniciar sesion primero");
    }
    setLiked(!liked);
    setLike((data, err) => {
      if (err) {
        alert(err);
      }
    }, post.id_post);
  };
  useEffect(() => {
    const user = JSON.parse(window.sessionStorage.getItem("session"));
    if (post.likes.includes(user?.id_user)) {
      setLiked(true);
    }
  }, []);
  return (
    <div className="block-photos__options">
      <IoMdArrowDown
        onClick={async () => {
          const resp = await fetch(
            // eslint-disable-next-line react/prop-types
            `http://localhost:5000/api/v1/post/${post.id_post}/download`
          );

          if (resp.ok) {
            // eslint-disable-next-line react/prop-types
            const name = post.url_image.split(
              "https://ik.imagekit.io/picmont/StoragePicmont/StorageProduction/images/"
            )[1];
            console.log(name);
            download(await resp.blob(), name);
          } else {
            alert("Error");
          }
        }}
        className="block-photos__icon-download"
        size={20}
      />
      <FaHeart
        onClick={() => {
          likeHandler();
        }}
        size={30}
        color={liked ? "red" : ""}
        className="block-photos__icon-heart"
      />
    </div>
  );
}

export default OptionsPost;
