/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Story = require("./models/story");
const Branch = require("./models/branch");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});
 

// |------------------------------|
// | write your API methods below!|
// |------------------------------|


// anything else falls to this "not found" case

router.get("/stories/romance", (req, res) => {
  Story.find({genre: "romance"}).then( (romancestories) => res.send(romancestories))
});
router.get("/stories/horror", (req, res) => {
  Story.find({genre: "horror"}).then( (horrorstories) => res.send(horrorstories))
});
router.get("/stories/comedy", (req, res) => {
  Story.find({genre : "comedy"}).then( (comedystories) => res.send(comedystories))
});

router.get("/branch", (req, res) => {
  Branch.find({parent : req.query.parent,}).then( (branches) => res.send(branches))
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.post("/story", auth.ensureLoggedIn, (req, res) => {
  const newStory = new Story({
    author_id: req.user._id,
    author: req.user.name,
    content: req.body.content,
    genre: "romance",
    likes: req.body.likes

});
newStory.save().then((story) => res.send(story))

});

router.post("/branch", auth.ensureLoggedIn, (req, res) => {
  const newBranch = new Branch({
    author_id: req.user._id,
    author: req.user.name,
    parent: req.body.parent,
    content: req.body.content,
    likes: req.body.likes
});

newBranch.save().then((branch) => res.send(branch))
});

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;