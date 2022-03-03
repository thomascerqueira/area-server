import httpRequest from "../../Functions/httpRequest"

function getTwitchAccessToken(req, res) {
    const code = req.body.code
    httpRequest(`https://id.twitch.tv/oauth2/token?client_id=iar5wg2v3xoe7mzbds9sgx16mvkabi&client_secret=4cs3b9tt6usygjqkytmt4qgbghd4vg&code=${code}&grant_type=authorization_code&redirect_uri=http://localhost:3000/services`, "post")
        .then((response) => {
            res.status(200).send(response)
        })
}

function refreshTwitchAccessToken(refreshToken) {

}

export {
    getTwitchAccessToken,

}