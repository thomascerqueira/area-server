import {transporter} from "../config.js";
import {readFileSync} from "fs";

async function sendMail(options, type, html = {}) {
  let body
  let buff
  switch (type) {
    case ("confirm"):
      buff = readFileSync("./Template/confirm.html")
      body = buff.toString().replaceAll("{{CONFIRM_LINK}}", html['confirm_link'])
      break
    case ("reaction"):
      buff = readFileSync("./Template/MailReaction.html")
      body = buff.toString().replaceAll("{{SERVICE}}", html['service']).replaceAll("{{VALUE}}", html['value'])
      break
    default:
      break
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: type,
    html: body,
  }
  transporter.sendMail(mailOptions)
    .then((val) => {
    })
    .catch((err) => {
      console.error(err)
    })
}

export {
  sendMail
}
