import {transporter} from "../config.js";
import {hbs} from "nodemailer-express-handlebars"

async function sendMail(email, object, template, context) {
  transporter.use("compile", hbs({
    viewEngine: "express-handlebars",
    viewPaths: "../Template/"
  }))

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: object,
    template: template,
    context: context
  }
  transporter.sendMail(mailOptions)
    .then((val) => {})
    .catch((err) => {console.error(err)})
}

export {
  sendMail
}