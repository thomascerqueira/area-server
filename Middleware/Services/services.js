import {admin, allDb, auth} from '../../config.js'
import {getAllValueDb} from "../../Functions/MongoDB/getValueDb.js";
import * as fs from "fs";
import {dropDocument} from "../../Functions/MongoDB/dropCollection.js";
import {removeValueArray} from "../../Functions/FIrebase.js";
import {createJsonServices} from "../../Functions/createOurServices.js";

function updateServices(req, res) {
  createJsonServices();
  const file = JSON.parse(fs.readFileSync('./service.json').toString())
  const db = admin.firestore()
  const dbRef = db.collection("Services")

  file.forEach((serv) => {
    try {
      dbRef.doc(serv.name).set({
        service: serv.name,
        actions: serv.actions ? serv.actions : [],
        reactions: serv.reactions ? serv.reactions : []
      })
        .then(() => {
          console.log(`${serv.name} Done`)
        })
        .catch(err => {
          console.log(`Error on ${serv.name}` + err)
        })
    } catch (err) {
      console.error(err)
    }
  })
  res.status(200).send({'msg': 'Done, See logs for information'})
}

function getAllServices(req, res) {
  const db = admin.firestore()
  const dbRef = db.collection("Services")

  dbRef.get()
    .then((snapshot) => {
      let arrayR = snapshot.docs.map(doc => {
        return doc.data()
      })
      res.status(200).json(arrayR)
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err)
    })
}

function getServicesUser(req, res) {
  let token
  try {
    token = req.headers.tokenid.split(' ')[1]
  } catch (err) {
    console.error(err)
    res.status(500).send({'msg': "Bad format Token"})
    return
  }

  auth.verifyIdToken(token)
    .then((decoded) => {
      getAllValueDb(allDb["ActionReaction"], "ActionReaction", {
        uid: decoded.user_id
      })
        .then((cursor => {
          let result = [];
          cursor.forEach((val) => {
            result.push({
              id: val.id,
              titre: val.title,
              actionService: val.action.service,
              actionElement: val.action.actionName,
              inputAction: val.action.data,
              reactionService: val.reaction.service,
              reactionElement: val.reaction.reactionName,
              inputReaction: val.reaction.data
            })
          })
          res.status(200).json(result)
        }))
        .catch((err) => {
          res.status(500).send(err)
        })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send(err);
    })
}

function deleteService(req, res) {
  let token
  try {
    token = req.headers.tokenid.split(' ')[1]
  } catch (err) {
    console.error(err)
    res.status(500).send({'msg': "Bad format Token"})
    return
  }

  auth.verifyIdToken(token)
    .then((decoded) => {
      dropDocument(allDb['ActionReaction'], 'ActionReaction', {
        id: req.body.id,
        uid: decoded.user_uid
      }).then(() => {
        try {
          console.log(decoded.user_uid)
          removeValueArray("References", "Surveys", "id_survey", req.body.id)
          res.status(200).send({'msg': 'Delete success'})
        } catch (err) {
          console.error(err)
          res.status(500).send(err)
        }
      })
        .catch((err) => {
          console.error(err)
          res.status(500).send(err)
        })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send(err);
    })
}

export {
  getAllServices,
  getServicesUser,
  updateServices,
  deleteService
}
