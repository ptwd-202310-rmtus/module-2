const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Car = require("./models/Car");

mongoose
  .connect('mongodb://localhost/example-mongoose-app')
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

//   conecting to the database doesnt actually create a database
// until you create your first document within that database






// Car.create({company: "Honda", model: "Accord"});

// you can create a new document with the .create method 

// or you can create a new object of the Car class using the new keyword
// and then using the .save() mongoose method

// let newCar = new Car({company: "Toyota", model: "Prius"});



// newCar.save()
// .then(()=>{
//     console.log("success");
// })
// .catch((err)=>{
//     console.log("oh no!");
// });


// anything you can put in the query bar in compass, you can put inside
// the .find object and it will work the same way 

// Car.find({$and: [{company: "Toyota"}, {model: "Corolla"}]})
// .then((result)=>{
//     console.log(result)
// })
// .then((err)=>{
//     console.log(err);
// })

// async version

// async function createACar(){
//   try{
//     let theCar = await Car.find({company: "Toyota"})
//     console.log(theCar);
//   } catch(err){
//     console.log(err);
//   }

// }
// Car.createACar();

// async version



// Car.find({company: "Toyota"})
// .then((result)=>{
//     console.log(result)
// })
// .then((err)=>{
//     console.log(err);
// })


// Car.findOne({company: "Toyota"})
// .then((result)=>{
//     console.log(result)
// })
// .then((err)=>{
//     console.log(err);
// })

// .find always returns an array even if theres only 1 thing in it
// .findOne always returns one single object, even if there are multiple 
// matches, it just returns the first match 


// Car.create({
//     company: "AC",
//     model: "GhPro"
// })
// .then(()=>{
//     console.log("success")
// })
// .catch((err)=>{
//     console.log("sorry", err)
// })


// {new: true} is only needed as the 3rd argument if you want 
// to see the updated document info in the .then block
// Car.findOneAndUpdate({model: "Civic Hybrid"},
//  {model: "Civic"}, {new: true} )
// .then((theCar)=>{
//     console.log(theCar);
// })
// .catch((err)=>{
//     console.log(err);
// })


// Car.findOneAndDelete({model: "Accord"})
// .then(()=>{
//     console.log("success")
// })
// .catch((err)=>{
//     console.log("could not delete")
// })


// .sort and .limit and .skip can all be chained onto 
// a .find query
// Car.find().sort({model: 1}).limit(2).skip(2)
// .then((cars)=>{
//     console.log(cars)
// })
// .catch((err)=>{
//     console.log(err)
// })