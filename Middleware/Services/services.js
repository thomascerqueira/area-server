import {admin} from '../../config.js'
import {getDoc} from 'firebase/firestore';

const allInfo = {
    gmail: "je suis gmail",
    github: "je suis github",
    email: "je suis email",
    meteo: "je suis meteo"
}

function getAllServices(req, res) {
    const docRef = admin.firestore().collection("Services")
    getDoc(docRef)
      .then((snapshot) => {
          if (snapshot.exists())
              console.log(snapshot.val())
          res.status(200).send(snapshot.val())
      })
      .catch((err) => {
          console.error(err);
          res.status(500).send(err)
      })
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
