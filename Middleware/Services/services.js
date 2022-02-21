import {admin, allDb, auth} from '../../config.js'
import {getAllValueDb, getOneValueDb} from "../../Functions/MongoDB/getValueDb.js";
// import services from ('../../test.json')

async function updateServices(req, res) {
  // const db = admin.firestore()
  // const dbRef = db.collection("Services")
  //
  // services.forEach((serv) => {
  //   dbRef.doc(serv.name).set({
  //     actions: serv.action,
  //     reactions: serv.reaction
  //   })
  // })
  res.status(200).send({'msg': 'inchalla ca marche'})
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
  const token = req.body.tokenID.split(' ')[1]

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
}

export {
  getAllServices,
  getServicesUser,
  updateServices
}
