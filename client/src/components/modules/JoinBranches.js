import React from "react";
import Branch from "./Branch.js";
import { NewBranch } from "./Input.js";

/**
 * @typedef ContentObject
 * @property {string} _id of story/branch
 * @property {string} author
 * @property {string} content of the story/branch
 * @property {string} genre of the story/branch
 * @property {Number} views
 * @property {Number} likes
 * @property {Number} contributors
 */

/**
 * Component that holds all the comments for a story
 *
 * Proptypes
 * @param {ContentObject[]} branch
 * @param {ContentObject} story
 */
const JoinBranches = (props) => {
  return (
    <div className="Story-preview">
      <div className="story-branches">
        {props.branches.map((branch) => (
          <Branch
            key={`Branch_${branch._id}`}
            _id={branch._id}
            author={branch.author}
            content={branch.content}
            genre={branch.genre}
            views = {branch.views}
            contributors = {branch.contributors}
            likes = {branch.likes}
          />
        ))}
        <NewBranch storyId={props.story._id} addBranch={props.addBranch} />
      </div>
    </div>
  );
};

export default JoinBranches;