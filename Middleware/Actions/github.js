import {addDocC} from "../../Functions/MongoDB/addDoc.js";
import httpRequest from "../../Functions/httpRequest.js";
import axios from "axios"
import {getOneValueDb} from "../../Functions/MongoDB/getValueDb.js";
import {allDb} from "../../config.js";
import { dispatchReaction } from "../../Functions/Reaction/Global.js";

function getWebHooks(req, res) {
    if (req.headers['x-github-event'] !== 'ping') {
      console.log(req.headers)
      getOneValueDb(allDb['ActionReaction'], 'ActionReaction', {
        "action.data.hook_id": req.headers['x-github-hook-id']
      })
        .then((res) => {
          if (res) {
            dispatchReaction(res, "")
          }
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
