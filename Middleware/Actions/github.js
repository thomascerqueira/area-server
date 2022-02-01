import {addDocC} from "../../Functions/MongoDB/addDoc.js";
import httpRequest from "../../Functions/httpRequest.js";
import axios from "axios"

function getWebHooks(req, res) {
    console.log(req.headers['x-github-hook-id'])
    console.log(req.headers)
    res.status(200).send({})
}

async function createGithubAction(req, res) {
  console.log(req.body)
    httpRequest(
      `https://api.github.com/repos/${req.body.githubName}/${req.body.repository}/hooks`,
      "post",
      {
          name: "web",
          active: true,
          config: {
              url: "https://area-epitech2.herokuapp.com/actions/github/hooks",
              content_type: "json",
              token: req.body.token
          },
      },
      {
        Authorization: `token ${req.body.token}`
      })
      .then((res) => {
        console.log(res)
        res.status(200).send({})
      })
      .catch((err) => {
        console.error(err)
        res.status(500).send({})
      })
    // addDocC("ActionReaction", req.body.uid, {
    //     "from": "github",
    //     "action": req.body.action,
    //     "hook_id": "",
    //     "to": "area",
    //     "reaction": "send_mail",
    //     "reaction_id": -1
    // })
    //   .then((result) => {
    //
    //   })
}

function deleteGithubAction(req, res) {
    res.status(401).send({})
}

function getGithubAction(req, res) {
    res.status(401).send({})
}

function updateGithubAction(req, res) {
    res.status(401).send({})
}

export {
    getWebHooks,
    createGithubAction,
    deleteGithubAction,
    getGithubAction,
    updateGithubAction
}
