function getActions(req, res) {
    res.status(200).send({})
}

function getPushWebHooks(req, res) {
    console.log(req)
    res.status(200).send({})
}

export {
    getActions,
    getPushWebHooks
}