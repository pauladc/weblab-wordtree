const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
    author: String,
    content: String,
    genre: String,
    parent: String,
    likes: Number,
    contributors: Number,
    views: Number

});

module.exports = mongoose.model("branch", BranchSchema);
