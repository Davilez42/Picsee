import { useState } from "react";
import "./uploadphotosview.css";
import sortPhotosInColumns from "../../utils/sortPhotosColumn";
import { IoMdClose } from "react-icons/io";
import usePosts from "../../hooks/usePosts";
import PostUploadPreview from "./PostUploadPreview";

// eslint-disable-next-line react/prop-types
function UploadPhotosModal({ visibleModel }) {
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
    if (files.length <= 0) {
      return alert("Debes cargar una foto para subir");
    }
    upload((data, error) => {
      if (error) {
        return alert(error);
      }
      visibleModel(false);
    }, files);
  };

  const deleteFileHandler = (file) => {
    const index = files.indexOf(file);
    setFiles([...files.slice(0, index), ...files.slice(index + 1)]);
  };

  const p = (f) => {
    return <PostUploadPreview f={f} deleteFile={deleteFileHandler} />;
  };
  return (
    <div className="block-upload">
      <IoMdClose
        onClick={() => {
          visibleModel(false);
        }}
        size={30}
        className="block-upload__icon-closed icon-x"
      />
      <div className="block-upload__container-upload">
        <div className="block-upload__drop-zone">
          <label>Subir fotos</label>
          <p className="block-upload__title-drop">
            Da click o arrastra una imagen en esta zona
          </p>
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

export default UploadPhotosModal;
