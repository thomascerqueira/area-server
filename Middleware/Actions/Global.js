import {createGithubAction} from "../../Functions/Actions/Github.js";
import {addDocC} from "../../Functions/MongoDB/addDoc.js";
import {allDb, auth} from "../../config.js";
import generateID from "../../Functions/generateID.js";
import { createDiscordReaction } from "../../Functions/Reaction/discord.js";

const actions = {'push': createGithubAction}
const reactions = {'sendMessage': createDiscordReaction}

async function createActionReaction(req, res) {
  try {
    const token = req.body.tokenID.split(' ')[1]

    auth.verifyIdToken(token)
      .then(async (decoded) => {
        const actionData = await actions[req.body.action.actionName](req.body.action.data)
        const reactionData = await reactions[req.body.action.reactionName](req.body.reaction.data)
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
          throw err
        })
      })
    .catch((err) => {
      console.error("token invalid ", err)
      throw err
    })
  }catch(err) {
    try {
      console.error("global error", err)
      res.status(500).send({msg: err})
    } catch (err) {
      res.status(500).send(err)
    }
  }
}

async function getActionReaction(req, res) {
  res.status(401).send({msg: "not implemented"})
}

async function updateActionReaction(req, res) {
  res.status(401).send({msg: "not implemented"})
}

async function deleteActionReaction(req, res) {
  res.status(401).send({msg: "not implemented"})
}

export {
  createActionReaction,
  getActionReaction,
  updateActionReaction,
  deleteActionReaction
}
