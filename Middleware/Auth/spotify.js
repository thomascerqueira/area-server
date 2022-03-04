import httpRequest from "../../Functions/httpRequest.js"

function getSpotifyAccessToken(req, res) {
	const code = req.body.code
	httpRequest(`https://accounts.spotify.com/api/token?grant_type=authorization_code&code=${code}&erdirect_uri=http://localhost:3000/services`, "post",
		{
		},
		{
			Authorization: "Basic NTQ1YTc0ZWYxZTQ4NGMxYzk4NmI3Yzg1YjQyYjA4ODg6NDc0YWYwN2Y4N2RlNDJhMWFmODEwMmE4NjgwNjI2Nzk=",
		}).then((response) => {
			console.log(response)
			res.status(200).send(response.data)
		}).catch(err => {
			console.log(err)
			res.status(500).send({ msg: "internal server error" })
		})
}

export {
	getSpotifyAccessToken
}