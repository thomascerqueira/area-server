import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin'
import Mongodb from 'mongodb'
import nodemailer from 'nodemailer'

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const myconfigFile = require("./area-e3fc2-firebase-adminsdk-oxpqx-d9f415baae.json")

admin.initializeApp({
    credential: admin.credential.cert(myconfigFile)
});


const auth = getAuth()
let allDb

Mongodb.MongoClient.connect(process.env.URL_MONGO, function(err, client) {
    if (err) {
        console.log('error' + err)
    } else {
        console.log("Connected to mongodb")
        allDb = {
            [process.env.DB_MONGO_USERS]: client.db(process.env.DB_MONGO_USERS),
            [process.env.DB_MONGO_POSTMAN]: client.db(process.env.DB_MONGO_POSTMAN)
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
    allDb,
    transporter
}