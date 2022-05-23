import React, { Component, useState, useEffect } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import ListItem from "../modules/ListItem"
import {NewStory} from "../modules/Input"
import { get } from "../../utilities";
import TempStory from "./TempStory.js"

import "../../utilities.css";
import "./Explore.css";
import "./Story.css";


const Explore = (props) => {

const [romance_stories, setRomanceStories] = useState([]);
const [horror_stories, setHorrorStories] = useState([]);
const [comedy_stories, setComedyStories] = useState([]);

  useEffect(() => {
    document.title = "Explore Page";
    get("/api/stories/romance").then((storyObjs) => {
      let reversedStoryObjs = storyObjs.reverse();
      setRomanceStories(reversedStoryObjs);
    });
    get("/api/stories/horror").then((storyObjs) => {
      let reversedStoryObjs = storyObjs.reverse();
      setHorrorStories(reversedStoryObjs);
    });
    get("/api/stories/comedy").then((storyObjs) => {
      let reversedStoryObjs = storyObjs.reverse();
      setComedyStories(reversedStoryObjs);
    });
    
  }, []);


  const addNewStory = (storyObj) => {
    setRomanceStories([storyObj].concat(romance_stories));
    setHorrorStories([storyObj].concat(horror_stories));
    setComedyStories([storyObj].concat(comedy_stories));
  };

  let romanceStoriesList = null;
  let horrorStoriesList = null;
  let comedyStoriesList = null;
  const hasRomanceStories = romance_stories.length !== 0;
  if (hasRomanceStories) {
    romanceStoriesList = romance_stories.map((storyObj) => (
      <ListItem
        key={`ListItem${storyObj._id}`}
        _id={storyObj._id}
        author={storyObj.author}
        content={storyObj.content}
        genre={storyObj.genre}
        likes={storyObj.likes}
        contributors={storyObj.contributors}
        views={storyObj.views}
      />
    ));
  } else {
    romanceStoriesList = <div className="noStories">No romances posted!</div>;
  }
  const hasHorrorStories = horror_stories.length !== 0;
  if (hasHorrorStories) {
    horrorStoriesList = horror_stories.map((storyObj) => (
      <ListItem
        key={`ListItem${storyObj._id}`}
        _id={storyObj._id}
        author={storyObj.author}
        content={storyObj.content}
        genre={storyObj.genre}
        likes={storyObj.likes}
        contributors={storyObj.contributors}
        views={storyObj.views}
      />
    ));
  } else {
    horrorStoriesList = <div className="noStories">No horror stories posted!</div>;
  }
  const hasComedyStories = comedy_stories.length !== 0;
  if (hasComedyStories) {
    comedyStoriesList = comedy_stories.map((storyObj) => (
      <ListItem
        key={`ListItem${storyObj._id}`}
        _id={storyObj._id}
        author={storyObj.author}
        content={storyObj.content}
        genre={storyObj.genre}
        likes={storyObj.likes}
        contributors={storyObj.contributors}
        views={storyObj.views}
      />
    ));
  } else {
    comedyStoriesList = <div className="noStories">No comedies posted!</div>;
  }
  return (
    <>
      {props.userId && <NewStory addNewStory={addNewStory} />}
      <div className="Genre">Romance</div>
      {romanceStoriesList}
      <div className="Genre">Horror</div>
      {horrorStoriesList}
      <div className="Genre">Comedy</div>
      {comedyStoriesList}
      <Link to="/tempstory">
      <p className="Story-preview">It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness</p>
      </Link>

    </>
  );
};

export default Explore;
