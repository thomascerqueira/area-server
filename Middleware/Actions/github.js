import {addDocC} from "../../Functions/MongoDB/addDoc.js";
import httpRequest from "../../Functions/httpRequest.js";
import axios from "axios"
import {getOneValueDb} from "../../Functions/MongoDB/getValueDb.js";
import {allDb} from "../../config.js";

function getWebHooks(req, res) {
    if (req.headers['x-github-event'] !== 'ping') {
      console.log(req.headers)
      getOneValueDb(allDb['ActionReaction'], 'ActionReaction', {
        hook_id: req.headers['x-github-hook-id']
      })
        .then((res) => {
          //TODO sent document to dispatch function
          console.log(res)
        })
        .catch((err) => {
          console.error(err)
        })
    }
    res.status(200).send({})
}

export {
    getWebHooks
}
