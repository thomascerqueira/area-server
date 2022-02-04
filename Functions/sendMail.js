import {transporter} from "../config.js";

async function sendMail(options, html="Reaction from AREA") {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: options.object,
    html: html,
  }
  transporter.sendMail(mailOptions)
    .then((val) => {})
    .catch((err) => {console.error(err)})
}

export {
  sendMail
}