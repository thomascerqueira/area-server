import {transporter} from "../config.js";
import {readFile} from "fs";
import {resolve} from "path";

async function sendMail(options, type, html = {}) {
  let body
  switch (type) {
    case ("confirm"):
      readFile(resolve("Template", "confirm.html"), (err, buff) => {
        body = buff.toString().replaceAll("{{CONFIRM_LINK}}", html['confirm_link'])
      })
      break
    case ("reaction"):
      readFile(resolve("Template", "MailReaction.html"), (err, buff) => {
        body = buff.toString().replaceAll("{{SERVICE}}", html['service']).replaceAll("{{VALUE}}", html['value'])
      })
      break
    default:
      break
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: options.object,
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
