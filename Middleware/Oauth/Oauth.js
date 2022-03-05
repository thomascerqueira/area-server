import {auth} from "../../config.js";

function authorize(req, res) {
      console.log(req.query.redirect_uri)
      res.status(200).render('Oauth', {test: "Quest ce que tu fais"})
}

export {
  authorize
}
