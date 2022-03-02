import { allDb, auth } from "../../config.js";
import { deleteGithubAction } from "../../Functions/Actions/Github.js";
import { getOneValueDb } from "../../Functions/MongoDB/getValueDb.js";
import { deleteFromDb } from "../../Functions/deleteFromDB.js";
import { deleteDiscordReaction } from "../../Functions/Reaction/discord.js";

function deleteForced(req, res) {
  req.body['ids'].forEach((id) => {
    dropDocument(allDb['ActionReaction'], "ActionReaction", {
      id: id
    })
      .then(() => {
        deleteField("References", "Surveys", id)
      })
  })
  res.status(200).send({ "msg": "Cest pas bien :'(" })
}

function deleteActionReaction(req, res) {

  const action = { "push": deleteGithubAction }
  const reaction = { "sendMessage": deleteDiscordReaction, "send_mail": (_) => { return true } }

  let token
  try {
    token = req.headers.tokenid.split(' ')[1]
  } catch (err) {
    console.error(err)
    res.status(401).send({ 'msg': "Bad format Token" })
    return
  }

  let githubToken
  if (!req.body.githubToken)
    githubToken = ""
  else
    githubToken = req.body.githubToken

  auth.verifyIdToken(token)
    .then((decoded) => {
      getOneValueDb(allDb['ActionReaction'], "ActionReaction", {
        id: req.body.id,
        uid: decoded.uid
      }).then(async (result) => {
        const actionResult = await action[result.action.actionName](result.action.data, githubToken)
        const reactionResult = await reaction[result.reaction.reactionName](result.action.data)
        console.log(actionResult, reactionResult)
        // if (actionResult && reactionResult) {
        //   deleteFromDb(decoded.uid, req.body.id)
        //   res.status(200).send({ msg: "successfuly delete" })
        // } else {
        //   res.status(500).send({ msg: "internal server error" })
        // }
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
