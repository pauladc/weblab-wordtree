import React, { useState }from 'react';
import "./Story.css";
import "./NewPostInput.css"
import Likes from "./Likes.js"


/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} author
 * @param {string} content of the story
 * @param {string} genre of the story
 * @param {Number} likes
 * @param {Number} views
 * @param {Number} contributors
 */


const Story = (props) => {
  const [likes, setLikes] = useState(0);

  const incrementLikes = () => {
    setLikes(likes + 1);
  };
  return (
    <div className="Story-preview">
      <span className="u-bold">{props.author}</span>
      <p className="u-flex-alignCenter">{props.content}</p>
      <p>{props.views}</p>
      <p>{props.likes}</p>
      <p>{props.contributors}</p>
      <button
        type="like"
        className="Like-button u-pointer"
        value="Like"
        onClick={incrementLikes}
      >Like</button>
     : {likes}
    </div>
  );
};

export default Story;