import httpRequest from "../httpRequest.js";

async function createGithubAction(options) {
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

async function deleteGithubAction(options) {
  try {
    let result = await httpRequest(
      `https://api.github.com/repos/${options.githubName.toString()}/${options.repository.toString()}/hooks/${options.hook_id.toString()}`,
      "delete",
      {
        config: {
          content_type: "json",
          token: options.token
        },
      },
      {
        Authorization: `token ${options.token}`
      })
  } catch (err) {
    console.error("Err Create Github Action", err)
    throw err;
  }
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
