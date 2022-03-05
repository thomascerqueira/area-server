import httpRequest from "../../Functions/httpRequest.js"

function getBattleNetAccessToken(req, res) {
	const code = req.body.code
	httpRequest(`https://eu.battle.net/oauth/token?`, "post",
		`code=${code}&grant_type=authorization_code&redirect_uri=http://localhost:3000/services`,
		{
			"Authorization": `Basic ${process.env.BATTLENET_CODE}`
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
