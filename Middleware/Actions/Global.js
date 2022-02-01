import {createGithubAction} from "../../Functions/Actions/Github.js";
import {addDocC} from "../../Functions/MongoDB/addDoc.js";
import {allDb} from "../../config.js";

const actions = {'github': createGithubAction}

async function createActionReaction(req, res) {
    let paramAction = {}
    let paramReaction = {}

    switch (req.body.action.service) {
      case 'github':
        paramAction = {
          githubName: req.body.action.githubName,
          repository: req.body.action.repository,
          token: req.body.action.token
        }
        break
      default:
        res.status(404).send({msg: 'unknown service'})
    }

    if (paramAction !== {})
      try {
        console.log("Wait avant ID")
        const id = await actions[req.body.action.service](paramAction)
        switch (req.body.reaction.service) {
          case 'email':
            paramReaction = {
              email: req.body.reaction.email,
              object: "Area Reaction",
              html: ""
            }
        }
        if (id === undefined)
          throw "Internal error"
        addDocC(
          allDb["ActionReaction"], req.body.uid, {
            "from": req.body.action.service.toString(),
            "action": req.body.action.action.toString(),
            "hook_id": id.toString(),
            "to": req.body.reaction.service.toString(),
            "reaction": req.body.reaction.action.toString(),
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
          console.error("global error", err.data.errors)
          res.status(500).send({msg: err})
        } catch (err) {
          res.status(500).send(err)
        }
      }

}

export {
  createActionReaction
}