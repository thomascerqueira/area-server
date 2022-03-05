import {auth} from "../../config.js";

function getPage(req, res) {
  const token = req.headers.tokenid.split(' ')[1]

  auth.verifyIdToken(token)
    .then((decoded) => {
      res.status(200).render('../../Template/Oauth')
    })
    .catch((error) => {
      console.log(error)
      res.status(401).send(error)
    })
}

export {
  getPage
}
