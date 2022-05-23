import React, { useState } from "react";
import "../pages/Explore.css";
import { post } from "../../utilities";
import "./NewPostInput.css"

/**
 * Input is a parent component for story/branches
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for branches
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
const Input = (props) => {
  const [value, setValue] = useState("");

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(value);
    setValue("");
  };


  return (

    <div className="Input-preview">
      <input
        type="text"
        placeholder={props.defaultText}
        value={value}
        onChange={handleChange}
        className="NewPostInput-input"
      />
      <button
        type="submit"
        className="NewPostInput-button u-pointer"
        value="Submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>

  );
};

/**
 * New Comment is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId to add branch to
 */
const NewBranch = (props) => {
  const addBranch = (value) => {
    const body = { parent: props.storyId, content: value };
    post("/api/branch", body).then((branch) => {
      props.addNewBranch(branch);

    });
  };

  return <Input defaultText="New Branch" onSubmit={addBranch} />;
};

/**
 * New Story is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */
const NewStory = (props) => {
  const addStory = (value) => {
    const body = { content: value };
    post("/api/story", body).then((story) => {
      // display this story on the screen
      props.addNewStory(story);

    });
  };

  return <Input defaultText="Write your own story!" onSubmit={addStory} />;
};

export { NewBranch, NewStory };