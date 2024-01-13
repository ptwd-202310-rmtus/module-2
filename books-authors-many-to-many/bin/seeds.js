// ℹ️ Connects to the database
require("../db");
const Author = require("../models/Author.model");



const bunchaAuthors = [
    {name: "Virginia Woolf", 
    birthdate: "January 25 1882", 
    hometown: "London, England",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgrkj8wImCxxF_E0AOoaTAtTcyE75f9G4D6g&usqp=CAU"
    },
    {name: "Tirso De Molina", 
    birthdate: "March 24 1579", 
    hometown: "Madrid, Spain",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2fM__xvorj8TRqiGwBekkVpmzqTuYblBXjg&usqp=CAU"
    },
    {name: "W.S. Merwin", 
    birthdate: "September 30 1927", 
    hometown: "New York, NY",
    image: "https://cdn.uanews.arizona.edu/s3fs-public/styles/uaqs_large/public/images/events/ws_merwin_1-14-69_by_nancy_carrick_holbert.jpg?itok=63u7XQ7U"
    }
] 

Author.create(bunchaAuthors)
.then(()=>{
    console.log("success");
})
.catch(()=>{
    console.log("oops");
})