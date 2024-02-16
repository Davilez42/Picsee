import { useState } from "react";
import "./uploadphotosview.css";
import sortPhotosInColumns from "../../utils/sortPhotosColumn";
import { IoMdClose } from "react-icons/io";
import usePosts from "../../hooks/usePosts";

// eslint-disable-next-line react/prop-types
function UploadPhotos({ setVisible }) {
  const [files, setFiles] = useState([]);
  const { upload } = usePosts();

  const setFile = (f) => {
    if (files.length > 5) {
      return alert("Solo pudes subir maximo 5 fotos");
    }
    if (f.type.search("image") != 0) {
      return alert("Porfavor sube solo imagenes");
    }
    setFiles([...files, f]);
  };
  const uploadFilesHandler = () => {
    console.log(files);
    if (files.length <= 0) {
      return alert("Debes cargar una foto para subir");
    }
    upload((data, error) => {
      if (error) {
        return alert(error);
      }
      setVisible(false);
    }, files);
  };

  const p = (f) => {
    const url = URL.createObjectURL(f);
    if (!f.tags) {
      f.tags = [];
    }
    return (
      <div className="block-upload_container-photo">
        <IoMdClose
          onClick={(e) => {
            e.preventDefault();
            const i = files.indexOf(f);
            setFiles([...files.slice(0, i), ...files.slice(i + 1)]);
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
  };
  return (
    <div className="block-upload">
      <IoMdClose
        onClick={() => {
          setVisible(false);
        }}
        size={30}
        className="block-upload__icon-closed icon-x"
      />
      <div className="block-upload__container-upload">
        <div className="block-upload__drop-zone">
          Subir fotos
          <label
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              e.preventDefault();
              setFile(e.dataTransfer.files[0]);
            }}
            htmlFor="input-photo"
            className="block-upload__container-previews"
          >
            {(() => {
              const sort = sortPhotosInColumns(files);
              return (
                <>
                  <div className="block-upload__column-1 column">
                    {sort[0].map(p)}
                  </div>
                  <div className="block-upload__column-2 column">
                    {sort[1].map(p)}
                  </div>
                  <div className="block-upload__column-3 column">
                    {sort[2].map(p)}
                  </div>
                </>
              );
            })()}
          </label>
          <input
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            id="input-photo"
            accept="image/*"
            className="block-upload__input-file"
            type="file"
          />
        </div>
        <div className="block-upload__container-options">
          <div
            className="block-upload__btn-upload-files btn-form"
            onClick={uploadFilesHandler}
          >
            Subir
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPhotos;
