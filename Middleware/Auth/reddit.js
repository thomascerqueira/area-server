import httpRequest from "../../Functions/httpRequest.js"

function getRedditAccessToken(req, res) {
	const code = req.body.code
	httpRequest(`https://www.reddit.com/api/v1/access_token?code=${code}&grant_type=authorization_code&redirect_uri=http://localhost:3000/services`, "post",
		{
		},
		{
			"Authorization": "Basic MEZRQTY0N25MWVI3NnpxYU81bjdIZzo="
		}).then((response) => {
			console.log(response)
			res.status(200).send(response.data)
		}).catch(err => {
			console.log(err)
			res.status(500).send({ msg: "internal server error" })
		})
}

export {
	getRedditAccessToken
}