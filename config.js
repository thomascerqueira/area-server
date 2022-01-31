import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin'
import Mongodb from 'mongodb'
import nodemailer from 'nodemailer'

admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "area-e3fc2",
        "private_key_id": "d9f415baaed2665a8b1f47bc97eb4db2005c5847",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDW1Wkj9MxJIPHi\nZgg8Jaee1KiNZN9PB/Svl136Ovfe7ElmRL813vm/93UOFgdWKoTnXzQxvrkFsZGk\nQ3rcdwyZw23kTBaZDCo/hFV716oCMcnPP+HbTNVstVflRgkKEVQLbMSgJRIpNy9k\nP8prGkJ7avvmu1uPp62OOmTTQY58mx4WiYlxC0t3LuKOAzgSLRx/4N+W+ZkeXTDB\nhk8eu5kDPgs3P7E/TA/uTY3anSaQQnfks0PBNHKIvdeB/1V2CgCZS6RcOhmQYqaT\nIpdBag2pFSWMnRg/QzhckxzGQ+/3MVa2+UJxV8j+iCGJtu7BEFVDzkiG+dodC1v4\nxaOnFfvDAgMBAAECggEAM0iRhzROOdzD8RwTNix09YzlSY99YTPQfMQg+nVuK0hz\ngxbBIF6Adwte5YRrru2KeWL4JjHVoB7R2gkDwLIoj2IgDwH82P8W7L+t2ljSrCBv\ngOpKg5u1TPSDLWeJC960FeAalfITgkQ6q28w5l1H5odU57Ds+/92hj+5Rtbc6TB8\nGH6c23qADMsk2DCiOVSyNCo687crBXbpSGmBesGZemyFnU3xHF+VUkN3WfhWwnEG\nLKgrUzgD9x59pkH5++HOCfoDsJPMdXx9nSD6GbZugaMjcoOuZ8ALk3xrM9uaw/dJ\nqrqOKPQLWdWSgHmCfCAFL8DU0S0rpmr2GyylqiJPPQKBgQD4goiX1SY+aty270a1\nhTMV+9T2LCPNDp5NDGojsZtQn9FKjbOWGLY8rurZLYYXwo4YeYmtBra+45QUf3dC\nBIlANgR00IcTRNZxBUK5FzH+2eJETdagmWwJT8O3c+j1HNAsSVgv5cAELcleAI3Z\nz5So90lohd//guiSGZ8i3uSG9wKBgQDdTwk1tnJsc3+TulV6ZN7vWv3L2WbhgxGv\nZV+wAgRav3hN/TrOFM+s6QWnA3p8wx7yYpcq85xW6zMw4yLOVYhpNMvkQWBKLLxj\n3o26IyyGsBS+tRcK/qmyJXZConM4c9xhnTgRten1RRua8fX4iK620PL+GMd/tYsG\nL4QWyEaClQKBgQDc1TKIqjMn+FJWhd7x44H4ISen8qWFzV3C3itbuLJqPPsBI1bZ\nJPCckFvFznyAlLUs7qP3jCXND/NBG9xgYCOPWfEv1TaTWvKs0J3wWLpm3DwDsp/t\nayjkRWuIlIoJdydOk4a4WZP+oql0zU1ApwRV+hnTtlPNfQkq+3W8yRGPFQKBgQCS\nE2sm0whv4USiQ+nL4ezs3IiNFzC7RYJU3XrteEdbhupnv/AiusXhgeXDOZ6N31T7\n9GuHZEkbbh/Z8vK0cuyZVMoIHcbq7uBiozG1XSY0uODYiDtvfGySM/v9O7EF4CPl\nIpsxxXtp83WnLnKG2+FGtmDNq5lzCGd9a7uqNgOkiQKBgCoUzmTL7qpk4/FqeUVV\nRU/SI2xdKoW67PKqukJqb+BOCxYi+5f28DAqD8wt7zEyh4g59taY1JaIuwp9kFzM\nAN8rdJ9d0gnEvaDZdegj9rVkdW6qrof0GvilT6TlV7bYuxN+P4BEb1gWn16N/0yB\nuoV2Nx9fZeWYvb6CPSLm1PRo\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-oxpqx@area-e3fc2.iam.gserviceaccount.com",
        "client_id": "106491080529008022413",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-oxpqx%40area-e3fc2.iam.gserviceaccount.com"
    })
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