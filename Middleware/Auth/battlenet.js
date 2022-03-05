import httpRequest from "../../Functions/httpRequest.js"
import {allDb, auth} from "../../config.js";
import {updateDoc} from "../../Functions/MongoDB/updateDoc.js";

function getBattleNetAccessToken(req, res) {
	let token = req.headers.tokenid.split(' ')[1]

	auth.verifyIdToken(token)
		.then((decoded) => {
			const code = req.body.code
			httpRequest(`https://eu.battle.net/oauth/token?`, "post",
				`code=${code}&grant_type=authorization_code&redirect_uri=http://localhost:3000/services`,
				{
					"Authorization": `Basic ${process.env.BATTLENET_CODE}`
				}).then((response) => {
				updateDoc(allDb[process.env.DB_MONGO_USERS], 'users', {
					uid: decoded.uid
				}, {
					$set: {
						"services.battleNet": {
							token: response.data.access_token,
							refresh_token: "",
							connected: true
						}
					}
				})
					.then(() => {
						console.log(response.data)
						res.status(200).send(response.data)
					})
					.catch((err) => {
						console.error(err)
						res.status(500).send(err)
					})
			}).catch(err => {
				console.log(err)
				res.status(500).send({ msg: "internal server error" })
			})
		})
		.catch(err => {
			console.log(err)
			res.status(401).send(err)
		})

}

export {
	getBattleNetAccessToken
}
