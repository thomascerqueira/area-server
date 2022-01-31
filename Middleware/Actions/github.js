function getActions(res, req) {
    res.status(200).send({})
}

function getPushWebHooks(res, req) {
    res.status(200).send(req)
}

export {
    getActions,
    getPushWebHooks
}