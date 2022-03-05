import { createGithubAction } from "../../Functions/Actions/Github.js";
import { addDocC } from "../../Functions/MongoDB/addDoc.js";
import { allDb, auth } from "../../config.js";
import generateID from "../../Functions/generateID.js";
import { createDiscordReaction } from "../../Functions/Reaction/discord.js";
import {weatherActionPoll, weatherActionTemp} from "../../Functions/Actions/Weather.js"
import {
  createSurveyAction,
  getActionSurvey,
  updateAllStatusSurveyAction,
  updateStatueSurveyAction
} from "../../Functions/Actions/Global.js";
import {covidAction} from "../../Functions/Actions/Covid.js";
import {deleteField} from "../../Functions/Firebase.js";
import {battleNetAction} from "../../Functions/Actions/BattleNet.js";
import { spotifyNewRecommendations, spotifyNewReleaseAction } from "../../Functions/Actions/Spotify.js";
import { coinrankingGetCoin } from "../../Functions/Actions/Coinranking.js";

export const actions = {
  'push': createGithubAction,
  "temperature": createSurveyAction,
  "pollution": createSurveyAction,
  "covid": createSurveyAction,
  "priceToken": createSurveyAction,
  "recommendation": createSurveyAction,
  "newRelease": createSurveyAction,
  "coinPrice": createSurveyAction
}

export const reactions = {
  'sendMessage': createDiscordReaction,
  "send_mail": emptyReactionData
}

export const customAction = {
  'temperature': weatherActionTemp,
  'pollution': weatherActionPoll,
  'covid': covidAction,
  'priceToken': battleNetAction,
  'recommendation': spotifyNewRecommendations,
  'newRelease': spotifyNewReleaseAction,
  'coinPrice': coinrankingGetCoin
}

async function emptyReactionData(data, _) {
  return data
}

async function updateSurveyAction(req, res) {
  try {
    updateStatueSurveyAction(req.body.id, req.body.value)
    res.status(200).send({"msg": "Done"})
  }catch (err) {
    res.status(500).send(err)
  }
}

async function updateAllSurveyAction(req, res) {
  try {
    updateAllStatusSurveyAction()
    res.status(200).send({'msg': "Done"})
  } catch (err) {
    res.status(500).send(err)
  }
}

async function getSurveyAction(req, res) {
  try {
    let result = await getActionSurvey()
    res.status(200).send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
}

async function createActionReaction(req, res) {
  let token = req.headers.tokenid.split(' ')[1]

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
        deleteField("References", "Surveys", id)
        try {
          res.status(404).send(err.data)
        } catch (err) {
          res.status(404).send(err)
        }
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
            'msg': result.msg,
            'id': id
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

export {
  createActionReaction,
  getActionReaction,
  updateActionReaction,
  updateSurveyAction,
  getSurveyAction,
  updateAllSurveyAction
}
