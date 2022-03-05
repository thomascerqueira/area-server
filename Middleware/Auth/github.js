import httpRequest from "../../Functions/httpRequest.js"

function getGithubAccessToken(req, res) {
	const code = req.body.code
	httpRequest(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_ID}&client_secret=${process.env.GITHUB_SECRET}&code=${code}&redirect_uri=http://localhost:3000/services`, "post",
		{
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
