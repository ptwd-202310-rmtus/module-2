const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
    title: String,
    image: String, 
    year: String,
    author: {type: Schema.Types.ObjectId, ref: "Author"}
    });



const Book = model("Book", bookSchema);

module.exports = Book;