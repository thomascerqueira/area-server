import {addDocC} from "../../Functions/MongoDB/addDoc.js";
import httpRequest from "../../Functions/httpRequest.js";
import axios from "axios"
import {getOneValueDb} from "../../Functions/MongoDB/getValueDb.js";
import {allDb} from "../../config.js";

function getWebHooks(req, res) {
    console.log(req.headers['x-github-hook-id'])
    console.log(req.headers)
    getOneValueDb(allDb['ActionReaction'], '*', {
        hook_id: req.headers['x-github-hook-id']
    })
      .then((res) => {
          console.log(res)
      })
      .catch((err) => {
          console.error(err)
      })
    res.status(200).send({})
}

export {
    getWebHooks
}
