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
  const reaction = { "sendMessage": deleteDiscordReaction }

  let token
  try {
    token = req.headers.tokenid.split(' ')[1]
  } catch (err) {
    console.error(err)
    res.status(401).send({ 'msg': "Bad format Token" })
    return
  }
  auth.verifyIdToken(token)
    .then((decoded) => {
      getOneValueDb(allDb['ActionReaction'], "ActionReaction", {
        id: req.body.id,
        uid: decoded.uid
      }).then(async (result) => {
        const actionResult = await action[result.action.actionName](result.action.data)
        const reactionResult = await reaction[result.reaction.reactionName](result.action.data)
        console.log(actionResult, reactionResult)
        // if (actionResult && reactionResult)
        //   deleteFromDb(decoded.uid, req.body.id)
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
