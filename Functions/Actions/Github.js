import httpRequest from "../httpRequest.js";
import { allDb } from "../../config.js"
import {getOneValueDb} from "../MongoDB/getValueDb.js";

async function createGithubAction(options, id) {
  try {
    let result = await httpRequest(
      `https://api.github.com/repos/${options.githubName.toString()}/${options.repository.toString()}/hooks`,
      "post",
      {
        name: "web",
        active: true,
        config: {
          url: "https://area-epitech2.herokuapp.com/actions/github/hooks",
          content_type: "json",
          token: options.token
        },
        events: [options.events]
      },
      {
        Authorization: `token ${options.token}`
      })
    options.hook_id = result.data.id.toString()
    return options
  } catch (err) {
    console.error("Err Create Github Action", err)
    throw err;
  }
}

async function deleteGithubAction(options, uid) {
  try {
    const user = await getOneValueDb(allDb['UsersDB'], 'users', {
			uid: uid
		})
		const token = user['services']['github']['token']

    let result = await httpRequest(
      `https://api.github.com/repos/${options.githubName.toString()}/${options.repository.toString()}/hooks/${options.hook_id.toString()}?access_token=${token}`,
      "delete",
      {
      },
      {
        Authorization: `token ${token}`
      })
  } catch (err) {
    console.error("Err Create Github Action", err)
    return false
  }
  return true
}

async function getGithubAction(options) {
  res.status(401).send({})
}

async function updateGithubAction(options) {
  res.status(401).send({})
}

export {
  createGithubAction,
  getGithubAction,
  updateGithubAction,
  deleteGithubAction
}
