import {auth} from "../../config.js";

function authorize(req, res) {
  const token = req.headers.tokenid.split(' ')[1]

  auth.verifyIdToken(token)
    .then((decoded) => {
      console.log(req.params.redirect_uri)
      res.status(200).render('../../Template/Oauth')
    })
    .catch((error) => {
      console.log(error)
      res.status(401).send(error)
    })
}

export {
  authorize
}
