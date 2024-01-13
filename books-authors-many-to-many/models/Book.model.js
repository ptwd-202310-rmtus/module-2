const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
    title: {type: String, required: [true, "please add a title"]},
    image: String, 
    year: String,
    authors: {type: [Schema.Types.ObjectId], ref: "Author"},
    donor: {type: Schema.Types.ObjectId, ref: "User"}
    });



const Book = model("Book", bookSchema);

module.exports = Book;