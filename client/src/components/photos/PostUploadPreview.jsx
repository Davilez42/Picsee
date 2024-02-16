/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
function PostUploadPreview({ f, deleteFile }) {
  const url = URL.createObjectURL(f);

  useEffect(() => {
    if (!f.tags) {
      f.tags = [];
    }
  }, []);
  return (
    <div className="block-upload_container-photo">
      <IoMdClose
        onClick={(e) => {
          e.preventDefault();
          deleteFile(f);
        }}
        size={30}
        className="block-upload__icon-delete icon-x"
      />
      <img className="block-upload_photo-uploaded" src={url} alt="" />
      <div className="block-upload__container-tags">
        <input
          type="text"
          onKeyDown={(e) => {
            if (e.key === "," || e.key === "Enter") {
              if (e.target.value.trim() === "") {
                return alert("No deben de haber tags vacios");
              }

              const parent = e.target.parentNode;
              const boxTag = document.createElement("DIV");
              boxTag.classList.add("block-upload__tag-closed");

              f.tags.push(e.target.value);
              boxTag.appendChild(document.createTextNode(e.target.value));

              parent.appendChild(boxTag);
              e.target.value = "";
            }
          }}
          className="block-upload__input-tag"
          placeholder="tags.."
        />
      </div>
    </div>
  );
}
export default PostUploadPreview;
