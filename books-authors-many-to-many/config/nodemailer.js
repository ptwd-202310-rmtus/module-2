const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "nick.borbe@ironhack.com",
    pass: process.env.GENERATED_PASSWORD,
  },
});


module.exports = transporter;