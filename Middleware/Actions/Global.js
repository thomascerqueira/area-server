import {createGithubAction} from "../../Functions/Actions/Github.js";
import {addDocC} from "../../Functions/MongoDB/addDoc.js";
import {allDb, auth} from "../../config.js";
import generateID from "../../Functions/generateID.js";
import {weatherActionTemp} from "../../Functions/Actions/Weather.js"

export const actions = {
  'push': createGithubAction,
  "temperature": () => {}
}

export const customAction = {
  'temperature': weatherActionTemp
}

async function createActionReaction(req, res) {
  let token
  try {
    token = req.headers.tokenid.split(' ')[1]
  } catch (err) {
    console.error(err)
    res.status(500).send({'msg': "Bad format Token"})
    return
  }

  auth.verifyIdToken(token)
    .then(async (decoded) => {
      const id = generateID()
      try {
        await actions[req.body.action.actionName](req.body.action.data, id)
      } catch (err) {
        console.error(err)
        res.status(404).send({'msg': "Error while creating, maybe its an unknown actionName or internal server error"})
        return
      }
      addDocC(
        allDb["ActionReaction"], "ActionReaction", {
          "uid": decoded.user_id,
          "id": id,
          "action": {
            "service": req.body.action.service.toString(),
            "actionName": req.body.action.actionName.toString(),
            "data": req.body.action.data
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
