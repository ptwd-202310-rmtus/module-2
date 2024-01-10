const bcryptjs = require("bcryptjs");

const saltRounds = 10;

const userPassword = "12345";

bcryptjs
.genSalt(saltRounds)
.then(salt => {
    console.log("salt: ", salt);
    // salt:  $2a$10$HEjPbR/2yloPHG3QbDWcZe

    return bcryptjs.hash(userPassword, salt)
})
.then(hashedPassword => {
    console.log("hashed password: ", hashedPassword);
    // hashed password:  $2a$10$HEjPbR/2yloPHG3QbDWcZeED5UtOoWVRUXMEcDoVdjRS0KvD9eHsS
})
.catch(err => console.log(err));