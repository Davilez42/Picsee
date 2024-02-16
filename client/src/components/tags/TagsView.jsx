import { useEffect, useState } from "react";
import useTags from "../../hooks/useTags";
import "./tagsview.css";
import { NavLink } from "react-router-dom";
function TagsView() {
  const [tags, setTags] = useState([]);
  const { get } = useTags();

  useEffect(() => {
    get((tags) => {
      setTags(tags);
    });
  }, []);

  return (
    <>
      <div className="container-main__block-tags block-tags">
        <p className="block-tags___title">Etiquetas Destacadas</p>
        <hr className="block-tags__separator" />
        <div className="block-tags__container-tags ">
          {tags.map((t, i) => (
            <NavLink to={`/tg/${t.name}`} key={i} className="block-tags__tag">
              {t.name}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default TagsView;
