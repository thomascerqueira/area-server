import {createGithubAction} from "../../Functions/Actions/Github.js";
import {addDocC} from "../../Functions/MongoDB/addDoc.js";
import {allDb, auth} from "../../config.js";
import generateID from "../../Functions/generateID.js";

const actions = {'push': createGithubAction}

async function createActionReaction(req, res) {
  let token
  try {
    token = req.body.tokenID.split(' ')[1]
  } catch (err) {
    res.status(500).send({'msg': "Bad format Token"})
    return
  }

  auth.verifyIdToken(token)
    .then(async (decoded) => {
      let data
      try {
        await actions[req.body.action.actionName](req.body.action.data)
      } catch (err) {
        console.error(err)
        res.status(500).send({'msg': "unknown action name"})
        return
      }
      const id = generateID()
      addDocC(
        allDb["ActionReaction"], "ActionReaction", {
          "uid": decoded.user_id,
          "id": id,
          "action": {
            "service": req.body.action.service.toString(),
            "actionName": req.body.action.actionName.toString(),
            "data": data
          },
          "reaction": {
            "service": req.body.reaction.service.toString(),
            "reactionName": req.body.reaction.reactionName.toString(),
            "data": req.body.reaction.data
          }
        })
        .then((result) => {
          res.status(200).send(result)
        })
        .catch((err) => {
          console.error("Add doc", err)
          res.status(500).send(err)
        })
    })
    .catch((err) => {
      console.error("token invalid ", err)
      res.status(500).send(err)
    })
}

export {
  createActionReaction
}
