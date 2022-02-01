import { auth } from '../../config.js'
import {addDocC} from "../../Functions/MongoDB/addDoc.js";
import {allDb} from "../../config.js";
import {getOneValueDb} from "../../Functions/MongoDB/getValueDb.js";
import {sendMail} from '../../Functions/sendMail.js'
import {userSchema} from "../../user.js";
import {createReadStream} from "fs"

function createUser(req, res) {

  auth.createUser({
    email: req.body.email,
    password: req.body.password,
    displayName: req.body.username
  })
    .then((userRecord) => {
      auth.generateEmailVerificationLink(req.body.email)
        .then((value) => {
          sendMail(req.body.email, "Verify your email",
            createReadStream("../../Template/confirm.html"), {CONFIRM_LINK: value, EMAIL_ADRESS: req.body.email})
            .then(() => {})
        })
      addDocC(allDb[process.env.DB_MONGO_USERS], "users", new userSchema({
        uid: userRecord.uid,
        email: req.body.email,
        name: req.body.username
      }))
        .then(() => {
          res.status(200).send({msg: "User created please verify your email"})})
        .catch(err => {
          console.error(err)
          res.status(500).send(err)
        })
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send(error)
    })
}

function deleteUser(req, res) {
  const token = req.body.tokenID.split(' ')[1]

  auth.verifyIdToken(token)
  .then((decoded) => {
    auth.deleteUser(decoded.uid)
    .then(() => {
      res.status(200).send({
        msg:"User deleted"})
    })
    .catch((err) => {
      res.status(500).send(err)
    })
  })
}

function signUser(req, res) {
  const token = req.body.tokenID.split(' ')[1]

  //ToDo verify email
  auth.verifyIdToken(token)
    .then((decoded) => {
      // if (!decoded.email_verified) {
      //   res.status(403).send({msg: 'Email not verified'})
      //   return
      // }
      getOneValueDb(allDb[process.env.DB_MONGO_USERS], 'users', {
        uid: decoded.user_id
      }).then((value) => {
        if (value)
          res.status(200).send(value)
        else {
          const data = new userSchema({
            uid: decoded.user_id,
            email: decoded.email,
            name: decoded.name
          })
          addDocC(allDb[process.env.DB_MONGO_USERS], 'users', data)
            .then(() => res.status(200).send(data))
            .catch((err) => res.status(500).send(err))
        }
      })
        .catch((err) => res.status(500).send(err))
    })
}

function signUserProvider(req, res) {
  const token = req.body.tokenID.split(' ')[1]
  const user = req.body.user

  //ToDo verify email
  auth.verifyIdToken(token)
    .then((decoded) => {
      console.log(decoded, user)
      getOneValueDb(allDb[process.env.DB_MONGO_USERS], 'users', {
        uid: decoded.user_id
      }).then((value) => {
        if (value)
          res.status(200).send(value)
        else {
          const data = new userSchema({
            uid: decoded.user_id,
            email: decoded.email,
            name: decoded.name
          })
          addDocC(allDb[process.env.DB_MONGO_USERS], 'users', data)
            .then(() => res.status(200).send(data))
            .catch((err) => res.status(500).send(err))
        }
      })
        .catch((err) => res.status(500).send(err))
    })
}

export {
  createUser,
  deleteUser,
  signUser,
  signUserProvider
}