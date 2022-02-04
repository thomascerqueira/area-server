import {createGithubAction} from "../../Functions/Actions/Github.js";
import {addDocC} from "../../Functions/MongoDB/addDoc.js";
import {allDb} from "../../config.js";
import generateID from "../../Functions/generateID.js";

const actions = {'push': createGithubAction}

async function createActionReaction(req, res) {
  try {
    console.log("Wait avant ID")
    const data = await actions[req.body.action.actionName](req.body.action.data)
    const id = generateID()
    addDocC(
      allDb["ActionReaction"], "ActionReaction", {
        "uid": req.body.uid.toString(),
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
  }catch(err) {
    try {
      console.error("global error", err)
      res.status(500).send({msg: err})
    } catch (err) {
      res.status(500).send(err)
    }
  }
}

export {
  createActionReaction
}
