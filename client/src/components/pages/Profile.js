import React, { useState, useEffect } from "react";
import { get } from "../../utilities"
import Saved from "./Saved.js"

import "../../utilities.css";
import "./Profile.css";
/**
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 */

const Profile = (props) => {
    const [user, setUser] = useState();
  
    useEffect(() => {
    document.title = "Profile Page";
     get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
    }, []);
    if (!user) {
      return (<div> Loading! </div>);
      }
    return (
      <>
        <div
          className="Profile-avatarContainer"
          onClick={() => {
            <Link to="/saved/"></Link>
          }}
        >
          <div className="Profile-avatar" />
        </div>
        <h1 className="Profile-name u-textCenter">{user.name}</h1>
        <hr className="Profile-linejj" />
        <div className="u-flex">
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">About Me</h4>
            <div id="profile-description">
              I enjoy writing short stories.
            </div>
          </div>
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">My Favorite Genres</h4>
            <div id="favorite-cat">Romance</div>
          </div>
        </div>
      </>
    );
  };
  
  export default Profile;
  