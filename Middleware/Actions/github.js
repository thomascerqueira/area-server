function getActions(res, req) {
    res.status(200).send({})
}

function getPushWebHooks(res, req) {
    console.log(req.body)
    res.status(200).send({})
}

export {
    getActions,
    getPushWebHooks
}