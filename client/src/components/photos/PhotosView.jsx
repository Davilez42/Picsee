import { useEffect, useState } from "react";
import "./photosview.css";
import usePosts from "../../hooks/usePosts";
import Post from "./Post";
import sortPhotosInColumns from "../../utils/sortPhotosColumn";
// eslint-disable-next-line react/prop-types
function PhotosView({ query, tag }) {
  const [colum1, setColum1] = useState([]);
  const [colum2, setColum2] = useState([]);
  const [colum3, setColum3] = useState([]);

  const { get } = usePosts();
  useEffect(() => {
    get(
      (photos, err) => {
        if (err) {
          return alert(err);
        }
        const sort = sortPhotosInColumns(photos);
        setColum1(sort[0]);
        setColum2(sort[1]);
        setColum3(sort[2]);
      },
      { query, tag }
    );
  }, [tag, query]);

  const f = (p, i) => {
    return <Post key={i} post={p} />;
  };

  return (
    <>
      <div className="container-main__block-photos block-photos">
        {[...colum1, ...colum2, ...colum3].length <= 0 ? (
          <div className="effect-loader">
            <svg className="ring" viewBox="25 25 50 50" stroke-width="5">
              <circle cx="50" cy="50" r="20" />
            </svg>
          </div>
        ) : (
          <></>
        )}
        <div className="block-photos__container-columns">
          <div className={`block-photos__column-1 column`}>{colum1.map(f)}</div>
          <div className={`block-photos__column-2 column`}>{colum2.map(f)}</div>
          <div className={`block-photos__column-3 column`}>{colum3.map(f)}</div>
        </div>
      </div>
    </>
  );
}

export default PhotosView;
