import {addDocC} from "../../Functions/MongoDB/addDoc.js";
import httpRequest from "../../Functions/httpRequest.js";
import axios from "axios"

function getWebHooks(req, res) {
    console.log(req.headers['x-github-hook-id'])
    console.log(req.headers)
    res.status(200).send({})
}

export {
    getWebHooks
}
