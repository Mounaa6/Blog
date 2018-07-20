const mongoose = require("mongoose");

const user = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    name: String,
    lastname: String,
    Articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'articles' }]

})


module.exports = user;
