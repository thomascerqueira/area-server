import httpRequest from "../../Functions/httpRequest.js"

function getRedditAccessToken(req, res) {
  const code = req.body.code
  httpRequest(`https://www.reddit.com/api/v1/access_token`, "post",
    `code=${code}&grant_type=authorization_code&redirect_uri=http://localhost:3000/services`,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${process.env.REDDIT_ID}`
    }).then((response) => {
    console.log(response)
    res.status(200).send(response.data)
  }).catch(err => {
    console.log(err)
    res.status(500).send({msg: "internal server error"})
  })
}

export {
  getRedditAccessToken
}
