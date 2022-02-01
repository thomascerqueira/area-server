import httpRequest from "../httpRequest.js";

async function createGithubAction(options) {
  try {
    return await httpRequest(
      `https://api.github.com/repos/${options.githubName}/${options.repository}/hooks`,
      "post",
      {
        name: "web",
        active: true,
        config: {
          url: "https://area-epitech2.herokuapp.com/actions/github/hooks",
          content_type: "json",
          token: options.token
        },
      },
      {
        Authorization: `token ${options.token}`
      })
  } catch (err) {
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