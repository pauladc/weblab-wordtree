import React from "react";

/**
 * Component that renders story likes
 *
 * Proptypes
 * @param {Number} likes 
 */
const Likes = (props) => {
  return (
    <div>
        <p>{props.likes}</p>
      </div>
  );
};

export default Likes;
