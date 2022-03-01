import {covidAction} from "../../Functions/Actions/Covid.js";

async function testCovid(req, res) {
  covidAction(req.body)
    .then((value) => {
      res.status(200).send({"Msg" : value === true ? "good" : "pas good"})
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err)
    })
}

export {
  testCovid
}
