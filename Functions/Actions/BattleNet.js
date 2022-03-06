import httpRequest from "../httpRequest.js";
import { allDb } from "../../config.js"
import {getOneValueDb} from "../MongoDB/getValueDb.js";
import {checkOption} from "./CheckOption.js";

async function battleNetAction(data, uid) {
	try {
		const user = await getOneValueDb(allDb['UsersDB'], 'users', {
			uid: uid
		})
		const token = user['services']['battleNet']['token']

		let result = await httpRequest(
			`https://eu.api.blizzard.com/data/wow/token/index?namespace=dynamic-eu&locale=fr_FR`,
			"get",
			{},
			{
				"Authorization": `Bearer ${token}`
			}
		)
		return (checkOption(data['option'], result.data['price'], data['value']))
	} catch (e) {
		console.error("Err in Battle Net action", e)
		throw e
	}
}

export {
    battleNetAction
}
