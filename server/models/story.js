const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
    author: String,
    content: String,
    genre: String,
    likes: Number,
    contributors: Number,
    views: Number,


});

module.exports = mongoose.model("story", StorySchema);