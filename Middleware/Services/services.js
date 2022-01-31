const allInfo = {
    gmail: "je suis gmail",
    github: "je suis github",
    email: "je suis email",
    meteo: "je suis meteo"
}

function getAllServices(req, res) {
    res.status(200).send({
        services: [
            {
                name: "gmail"
            },
            {
                name: 'github'
            },
            {
                name: 'email'
            },
            {
                name: 'meteo'
            }
        ]
    });
}

function getService(req, res) {
    if (req.body.service in allInfo)
        res.status(200).send({
            service: allInfo[req.body.service]
        })
    else
        res.status(404).send({
            msg: 'Service not found'
        })
}

export {
    getAllServices,
    getService
}