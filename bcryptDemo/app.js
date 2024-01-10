const bcryptjs = require("bcryptjs");

const saltRounds = 10;

const userPassword = "12345";

const salt1 = bcryptjs.genSaltSync(saltRounds);

console.log(`SALT 1: ${salt1}`); // $2a$10$LGOAYmxVL9T.bmkocH/qYe

const hashedPassword = bcryptjs.hashSync(userPassword, salt1);

console.log(`HASHED-PASSWORD: ${hashedPassword}`); // $2a$10$LGOAYmxVL9T.bmkocH/qYeM3Gi9gg/cmSLtPY80vHCCkLStpsNGTi