import {admin} from '../../config.js'

async function getAllServices(req, res) {
    const db = admin.firestore()
    const dbRef = db.collection("Services")
    let response;

    dbRef.get()
      .then(async (snapshot) => {
          await snapshot.forEach(doc => {
              response += doc.data();
          })
          res.status(200).send(response)
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
