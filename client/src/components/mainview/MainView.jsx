import { useEffect } from "react";
import PhotosView from "../photos/PhotosView";
import TagsView from "../tags/TagsView";
import { useParams } from "react-router-dom";
function MainView() {
  const { tag, query } = useParams();
  useEffect(() => {}, []);
  return (
    <>
      <div className="container-main">
        <TagsView />
        <PhotosView tag={tag} query={query} />
      </div>
    </>
  );
}

export default MainView;
