const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    company: {type: String},
    model: String,
    bodyType: {type: String,
        enum : ["coupe", "sedan", "truck", "suv", "roadster"],
    },
    picture: String,

  });


  const Car = mongoose.model(
    'Car',
    carSchema
 );


 module.exports = Car;