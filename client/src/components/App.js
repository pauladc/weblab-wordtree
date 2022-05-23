import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NavBar from "./modules/NavBar.js";
import NotFound from "./pages/NotFound.js";
import Explore from "./pages/Explore.js";
import Profile from "./pages/Profile.js"
import Saved from "./pages/Saved.js"
import TempStory from "./pages/TempStory.js"

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";


/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    console.log("Logged out successfully!");
    setUserId(null);
    post("/api/logout");
  };

  return (
    <>
    <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId}/>
    <div className="App-container">
      <Router>
      <Explore path="/" userId={userId} />
      <Profile path="/profile/:userId"/>
      <Saved path="/saved/" userId={userId} />
      <TempStory path="/tempstory/"/>
      <NotFound default />
      </Router>
      </div>
    </>
  );
};

export default App;
