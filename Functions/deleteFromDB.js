import { dropDocument } from "./MongoDB/dropCollection.js";
import { deleteField } from "./Firebase.js";
import { allDb, auth } from "../config.js";

function deleteFromDb(uid, id) {
  console.log(`Deleting ActionReaction ${id} for user ${uid}`)
  dropDocument(allDb['ActionReaction'], 'ActionReaction', {
    id: id,
    uid: uid
  }).then(() => {
    try {
      deleteField("References", "Surveys", id)
      res.status(200).send({ 'msg': 'Delete success' })
      console.log(`ActionReaction ${id} Deleted successfully`)
    } catch (err) {
      console.error(err)
      res.status(500).send(err)
    }
  })
    .catch((err) => {
      console.error(err)
      res.status(500).send(err)
    })
}

export {
  deleteFromDb
}