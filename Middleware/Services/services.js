import {admin, allDb, auth} from '../../config.js'
import {getAllValueDb, getOneValueDb} from "../../Functions/MongoDB/getValueDb.js";

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
        .then((value => {
          console.log(value)
        }))
    })
  res.status(200).json({'msg': "TA GROSSE DARONNE"})
}

export {
    getAllServices,
    getServicesUser
}
