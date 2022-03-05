import httpRequest from "../../Functions/httpRequest.js"

function getTwitchAccessToken(req, res) {
    const code = req.body.code
    httpRequest("https://id.twitch.tv/oauth2/token", "post", {
        client_id: `${process.env.TWITCH_ID}`,
        client_secret: `${process.env.TWITCH_SECRET}`,
        code: `${code}`,
        grant_type: "authorization_code",
        redirect_uri: "http://localhost:3000/services"
    }).then((response) => {
        console.log(response)
        res.status(200).send(response.data)
    }).catch(err => {
        console.log(err)
        res.status(500).send({ msg: "internal server error" })
    })
}

function refreshTwitchAccessToken(refreshToken) {

}

export {
    getTwitchAccessToken,

}
