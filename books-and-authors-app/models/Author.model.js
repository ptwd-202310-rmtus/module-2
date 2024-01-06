const { Schema, model } = require("mongoose");

const authorSchema = new Schema({
    name: String,
    birthdate: String,
    image: String,
    hometown: String
    });



const Author = model("Author", authorSchema);

module.exports = Author;