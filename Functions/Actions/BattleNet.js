import httpRequest from "../httpRequest.js";
import { allDb } from "../../config.js"
import { checkOption } from "./Weather.js";
import {getOneValueDb} from "../MongoDB/getValueDb.js";

async function battleNetAction(data, uid) {
	try {
		const data = await getOneValueDb(allDb['UsersDB'], 'users', {
			uid: uid
		})
		const token = data['services']['battleNet']['token']

		let result = await httpRequest(
			`https://eu.api.blizzard.com/data/wow/token/index?namespace=dynamic-eu&locale=fr_FR`,
			"get",
			{},
			{
				"Authorization": `Bearer ${token}`
			}
		)
		console.log(result)
		console.log(result.data['price'])
		console.log(data['option'])
		console.log(data['value'])
		return (checkOption(data['option'], result.data['price'], data['value']))
	} catch (e) {
		console.error("Err in Battle Net action", e)
		throw e
	}
}

export {
    battleNetAction
}
