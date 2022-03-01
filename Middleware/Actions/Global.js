import { createGithubAction } from "../../Functions/Actions/Github.js";
import { addDocC } from "../../Functions/MongoDB/addDoc.js";
import { allDb, auth } from "../../config.js";
import generateID from "../../Functions/generateID.js";
import { createDiscordReaction } from "../../Functions/Reaction/discord.js";
import {weatherActionPoll, weatherActionTemp} from "../../Functions/Actions/Weather.js"
import {createSurveyAction, getActionSurvey, updateStatueSurveyAction} from "../../Functions/Actions/Global.js";
import {covidAction} from "../../Functions/Actions/Covid.js";

export const actions = {
  'push': createGithubAction,
  "temperature": createSurveyAction,
  "pollution": createSurveyAction,
  "covid": createSurveyAction
}

export const reactions = {
  'sendMessage': createDiscordReaction
}

export const customAction = {
  'temperature': weatherActionTemp,
  'pollution': weatherActionPoll,
  'covid': covidAction
}

async function updateSurveyAction(req, res) {
  try {
    updateStatueSurveyAction(req.body.id, req.body.value)
    res.status(200).send({"msg": "Done"})
  }catch (err) {
    res.status(500).send(err)
  }
}

async function getSurveyAction(req, res) {
  try {
    getActionSurvey()
    res.status(200).send({"msg": "good"})
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
}

async function createActionReaction(req, res) {
  let token
  try {
    token = req.headers.tokenid.split(' ')[1]
  } catch (err) {
    console.error(err)
    res.status(401).send({'msg': "Bad format Token"})
    return
  }

  auth.verifyIdToken(token)
    .then(async (decoded) => {
      const id = generateID()
      let actionData
      let reactionData
      try {
        actionData = await actions[req.body.action.actionName](req.body.action.data, id)
        reactionData = await reactions[req.body.reaction.reactionName](req.body.reaction.data, id)
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
            "data": actionData
          },
          "reaction": {
            "service": req.body.reaction.service.toString(),
            "reactionName": req.body.reaction.reactionName.toString(),
            "data": reactionData
          },
          "title": req.body.title
        })
        .then((result) => {
          res.status(200).send({
            id: id
          })
        })
        .catch((err) => {
          console.error("Add doc", err)
          res.status(500).send(err)
        })
    })
    .catch((err) => {
      console.error("token invalid ", err)
      res.status(401).send(err)
    })
}

async function getActionReaction(req, res) {
  res.status(401).send({ msg: "not implemented" })
}

async function updateActionReaction(req, res) {
  res.status(401).send({ msg: "not implemented" })
}

async function deleteActionReaction(req, res) {
  res.status(401).send({ msg: "not implemented" })
}

export {
  createActionReaction,
  getActionReaction,
  updateActionReaction,
  deleteActionReaction
  updateSurveyAction,
  getSurveyAction
}
