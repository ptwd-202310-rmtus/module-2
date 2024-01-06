const { Schema, model } = require("mongoose");

const authorSchema = new Schema({
    name: String,
    birthdate: String,
    image: String,
    hometown: String,
    // books: {type: [Schema.Types.ObjectId], ref: "Book"}
    // this is the other way you could keep track of the relationshp between book and author
    // here we would be keeping an array of book Ids inside each author object
    });



const Author = model("Author", authorSchema);

module.exports = Author;