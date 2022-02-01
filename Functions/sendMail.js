import {transporter} from "../config.js";

async function sendMail(email, object, body, context) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: object,
    html: body,
    context: context
  }
  transporter.sendMail(mailOptions)
    .then((val) => {})
    .catch((err) => {console.error(err)})
}

export {
  sendMail
}