const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
    title: String,
    image: String, 
    year: String,
    author: {type: Schema.Types.ObjectId, ref: "Author"},
    donor: {type: Schema.Types.ObjectId, ref: "User"}
    });



const Book = model("Book", bookSchema);

module.exports = Book;