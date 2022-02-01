import {transporter} from "../config.js";

async function sendMail(email, object, html) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: object,
    html: html,
  }
  transporter.sendMail(mailOptions)
    .then((val) => {})
    .catch((err) => {console.error(err)})
}

export {
  sendMail
}