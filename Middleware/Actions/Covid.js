import {covidAction} from "../../Functions/Actions/Covid.js";

async function testCovid(req, res) {
  covidAction(req.body)
    .then(() => {
    })
    .catch(err => {
      console.error(err)
    })
}

export {
  testCovid
}
