import React from "react";

/**
 * Component to render a single branch
 *
 * Proptypes
 * @param {string} _id of branch
 * @param {string} author
 * @param {string} content of the branch
 * @param {string} genre of the branch
 * @param {int} views
 * @param {int} likes
 * @param {int} contributors
 */
const Branch = (props) => {
  return (
    <div className="Card-commentBody">
      <span className="u-bold">{props.author}</span>
      <span>{" | " + props.genre}</span>
      <span>{" | " + props.content}</span>
      <span>{" | " + props.viws}</span>
      <span>{" | " + props.likes}</span>
      <span>{" | " + props.contributors}</span>
    </div>
  );
};

export default Branch;