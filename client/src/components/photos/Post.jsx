/* eslint-disable react/prop-types */
import { useState } from "react";
import OptionsPost from "./OptionsPost";

import "./post.css";
import capitalizeString from "../../utils/capitalizeString";

function Post({ post }) {
  const [dataPhoto, setDataPhoto] = useState("collapse");
  const [brightness, setBrightness] = useState(100);
  return (
    <>
      <div
        id={post.id_post}
        onMouseEnter={() => {
          setDataPhoto("visible");
          setBrightness(80);
        }}
        onMouseLeave={() => {
          setDataPhoto("collapse");
          setBrightness(100);
        }}
        className="block-photos__container-post"
      >
        <img
          src={post.url_image}
          className="block-photos__photo"
          alt=""
          loading="lazy"
        />

        <div
          className="block-photos__data-photo "
          style={{
            visibility: dataPhoto,
            backdropFilter: `brightness(${brightness}%)`,
          }}
        >
          <div className="block-photos__info-author">
            <img
              className="bloc-photos__avatar-author"
              src={post.author_avatar}
              alt=""
            />
            <div className="block-photos__container-text">
              <p className="block-photos__author_name">
                {capitalizeString(post.author_name)}
              </p>
              <p className="block-photos__date_upload">
                {new Date(post.upload_date).toDateString()}
              </p>
            </div>
          </div>
          <OptionsPost post={post} />
        </div>
      </div>
    </>
  );
}

export default Post;
