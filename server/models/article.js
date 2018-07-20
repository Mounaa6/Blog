const mongoose = require("mongoose");

const article = new mongoose.Schema({
    Title: String,
    Content: String,
    Date: Number,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }

})


module.exports = article;