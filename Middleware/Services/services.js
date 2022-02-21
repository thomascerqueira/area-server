import {admin} from '../../config.js'

async function getAllServices(req, res) {
    const db = admin.firestore()
    const dbRef = db.collection("Services")

    dbRef.get()
      .then(async (snapshot) => {
          let arrayR = snapshot.docs.map(doc => {
              return doc.data()
          })
          res.status(200).json(arrayR)
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
