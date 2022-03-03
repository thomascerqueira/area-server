import httpRequest from "../../Functions/httpRequest.js"

function getTwitchAccessToken(req, res) {
    const code = req.body.code
    httpRequest("https://id.twitch.tv/oauth2/token", "post", {
        client_id: "iar5wg2v3xoe7mzbds9sgx16mvkabi",
        client_secret: "4cs3b9tt6usygjqkytmt4qgbghd4vg",
        code: `${code}`,
        grant_type: "authorization_code",
        redirect_uri: "http://localhost:3000/services"
    })
        .then((response) => {
            res.status(200).send(response)
        }).catch(err => {
            res.status(500).send({ msg: "internal server error" })
        })
}

function refreshTwitchAccessToken(refreshToken) {

}

export {
    getTwitchAccessToken,

}