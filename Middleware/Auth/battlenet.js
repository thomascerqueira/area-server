import httpRequest from "../../Functions/httpRequest.js"

function getBattleNetAccessToken(req, res) {
	const code = req.body.code
	httpRequest("https://eu.battle.net/oauth/token", "post",
		{
			code: code,
			grant_type: "authorization_code",
			redirect_uri: "https://localhost:3000/services",
		},
		{
			"Authorization": "Basic YTI5ZGZmYzMwY2JmNDUxMmE0MTg3NDBkNWVkODRlZjA6VW5JajZmeXZBUWZHTUpvN29KVzE4bTNHWExpVE9DclI="
		}).then((response) => {
			console.log(response)
			res.status(200).send(response.data)
		}).catch(err => {
			console.log(err)
			res.status(500).send({ msg: "internal server error" })
		})
}

export {
	getBattleNetAccessToken
}