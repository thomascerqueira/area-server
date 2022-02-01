import httpRequest from "../httpRequest.js";

async function createGithubAction(options) {
  console.log(options)
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
          token: options.token.toString()
        },
      },
      {
        Authorization: `token ${options.token.toString()}`
      })
    return result.data.id
  } catch (err) {
    console.error("Err Create Github Action", err)
    throw err;
  }
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
  createGithubAction,
  deleteGithubAction,
  getGithubAction,
  updateGithubAction
}