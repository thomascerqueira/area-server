import {getAuth} from 'firebase-admin/auth';
import admin from 'firebase-admin'
import Mongodb from 'mongodb'
import nodemailer from 'nodemailer'

admin.initializeApp({
  credential: admin.credential.cert({
    "type": process.env.FIREBASE_TYPE,
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_AUTH_URI,
    "token_uri": process.env.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER,
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT
  })
});

const auth = getAuth()
let allDb

Mongodb.MongoClient.connect(process.env.URL_MONGO, function (err, client) {
  if (err) {
    console.log('error' + err)
  } else {
    console.log("Connected to mongodb")
    allDb = {
      [process.env.DB_MONGO_USERS]: client.db(process.env.DB_MONGO_USERS),
      [process.env.DB_MONGO_POSTMAN]: client.db(process.env.DB_MONGO_POSTMAN),
      ['ActionReaction']: client.db("ActionReaction")
    }
  }
})

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

export {
  auth,
  admin,
  allDb,
  transporter
}
