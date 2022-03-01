import {allDb, auth} from "../../config.js";
import {dropDocument} from "../../Functions/MongoDB/dropCollection.js";
import {deleteField} from "../../Functions/Firebase.js";

function deleteForced(req, res) {
  req.body['ids'].forEach((id) => {
    dropDocument(allDb['ActionReaction'], "ActionReaction", {
      id: id
    })
      .then(() => {
        deleteField("References", "Surveys", id)
      })
  })
  res.status(200).send({"msg": "Cest pas bien :'("})
}

function deleteActionReaction(req, res) {
  let token
  try {
    token = req.headers.tokenid.split(' ')[1]
  } catch (err) {
    console.error(err)
    res.status(401).send({'msg': "Bad format Token"})
    return
  }

  auth.verifyIdToken(token)
    .then((decoded) => {
      console.log(`Deleting ActionReaction ${req.body.id} for user ${decoded.uid}`)
      dropDocument(allDb['ActionReaction'], 'ActionReaction', {
        id: req.body.id,
        uid: decoded.uid
      }).then(() => {
        try {
          deleteField("References", "Surveys", req.body.id)
          res.status(200).send({'msg': 'Delete success'})
          console.log(`ActionReaction ${req.body.id} Deleted successfully`)
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
      res.status(401).send(err);
    })
}

export {
  deleteActionReaction,
  deleteForced
}
