import React, { useEffect, useState } from "react";
import Story from "./Story.js";
import { get } from "../../utilities";
import "./Story.css";
import "./Items.css";
import JoinBranches from "./JoinBranches.js";

/**
 * Component for displaying content like stories
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} author
 * @param {string} author_id
 * @param {string} content of the story
 * @param {string} genre of the story
 * @param {Number} likes of the story
 * @param {Number} contributors of the story
 * @param {Number} views of the story
 */
const ListItem = (props) => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    get("api/branch", { parent: props._id }).then((branches) => {
      setBranches(branches);
    });
  }, []);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addBranch = (branchObj) => {
    setBranches(branches.concat([branchObj]));
  };

  return (
    <div className="Story-preview">
      <Story _id={props._id} author={props.author} content={props.content} genre={props.genre} likes={props.likes} contributors={props.contributors} views={props.views} />
      <JoinBranches story={props} branches={branches} addBranch={addBranch} />
    </div>
  );
};

export default ListItem;