  const { verify } = require("jsonwebtoken");
const nodemailer = require("nodemailer");

  const sendEmail = async (email, username, token) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      });
  
const link = `${process.env.APP_URL}/verify?token=${token}`

      await transporter.sendMail({
        from: 'no-reply@blogspot.com',
        to: email,
        subject: "Verify Email",
        html: `<div><h1>Hi ${email}</h1><br/><p>Click the button to verify your email</p><br/><a href=${link}>Click Here</a></div>`,
      });
      console.log("email sent sucessfully");
    } catch (error) {
      console.log("email not sent");
      console.log(error);
    }
  };
  
  module.exports = {
    sendEmail,
  };