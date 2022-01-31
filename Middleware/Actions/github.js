function getActions(req, res) {
    res.status(200).send({})
}

function getPushWebHooks(req, res) {
    console.log(req.headers.x-github-hook-id)
    res.status(200).send({})
}

export {
    getActions,
    getPushWebHooks
}