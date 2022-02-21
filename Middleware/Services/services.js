import {admin} from '../../config.js'

const allInfo = {
    gmail: "je suis gmail",
    github: "je suis github",
    email: "je suis email",
    meteo: "je suis meteo"
}

function getAllServices(req, res) {
    const db = admin.firestore()
    const dbRef = db.collection("Services")

    dbRef.get()
      .then((snapshot) => {
          snapshot.forEach(doc => {
              console.log(doc.data())
          })
          res.status(200).send({'msg': "good"})
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
