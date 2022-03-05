import httpRequest from "../../Functions/httpRequest.js"
import {allDb, auth} from "../../config.js";
import {updateDoc} from "../../Functions/MongoDB/updateDoc.js";

function getGithubAccessToken(req, res) {
  let token = req.headers.tokenid.split(' ')[1]

  auth.verifyIdToken(token)
    .then((decoded) => {
      const code = req.body.code
      httpRequest(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_ID}&client_secret=${process.env.GITHUB_SECRET}&code=${code}&redirect_uri=http://localhost:3000/services`, "post",
        {},
        {
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        }).then((response) => {
        updateDoc(allDb[process.env.DB_MONGO_USERS], 'users', {
          uid: decoded.uid
        }, {
          $set: {
            "services.github": {
                token: response.data.access_token,
                refresh_token: "",
                connected: true
            }
          }
        })
          .then(() => {
            console.log(response.data)
            res.status(200).send(response.data)
          })
          .catch((err) => {
            console.error(err)
            res.status(500).send(err)
          })
      }).catch(err => {
        console.log(err)
        res.status(500).send({msg: "internal server error"})
      })
    })
    .catch((error) => {
      console.error(error)
      res.status(401).send(error)
    })
}

export {
  getGithubAccessToken
}
