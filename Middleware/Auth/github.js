import httpRequest from "../../Functions/httpRequest"

function getGithubAccessToken(req, res) {
	const code = req.body.code
	httpRequest("https://github.com/login/oauth/access_token", "post", {
		client_id: "b8b149a225608f23c2b6",
		client_secret: "d91aafb434103b6f5c400e5294fb4292900acecd",
		code: code,
		redirect_uri: "http://localhost:3000/services",
	},
		{
			"Accept": "application/json",
			"Content-Type": "application/x-www-form-urlencoded"
		}).then((response) => {
			console.log(response)
			res.status(200).send(response.data)
		}).catch(err => {
			console.log(err)
			res.status(500).send({ msg: "internal server error" })
		})
}

export {
	getGithubAccessToken
}