const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    company: {type: String, minLength: 5},
    model: String,
    // bodyType: {type: String,
    //     enum : ["coupe", "sedan", "truck"],
    // }
  });


  const Car = mongoose.model(
    'Car',
    // Car -> gets translated into a collection in the DB
    // called cars.
    //  mongoose automatically pluralizes, and 
    // lowercases the string
    // and it is smart enough to turn words like 
    // person -> people
    carSchema
 );


 module.exports = Car;