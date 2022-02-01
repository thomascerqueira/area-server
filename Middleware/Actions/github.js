function getWebHooks(req, res) {
    console.log(req.headers['x-github-hook-id'])
    console.log(req.headers)
    res.status(200).send({})
}

function createGithubAction(req, res) {
    res.status(401).send({})
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