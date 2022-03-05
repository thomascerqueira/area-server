import httpRequest from "../httpRequest.js";
import { allDb } from "../../config.js"
import { checkOption } from "./Weather.js";
import {getOneValueDb} from "../MongoDB/getValueDb.js";

async function battleNetAction(data, uid) {
    try {
        const data = await getOneValueDb(allDb['UsersDB'], 'users', {
            uid: uid
        })
        console.log(data)
        const token = data['services']['battleNet']['token']

        let result = await httpRequest(
            `https://eu.api.blizzard.com/data/wow/token/index?namespace=dynamic-eu&locale=fr_FR`,
            "get",
            {},
            {
                "Authorization": `Bearer ${token}`
            }
        )
        if (result.data.length > 0) {
            return (checkOption(data['option'], result.data['price'], data['value']))
        }
        return false
    } catch (e) {
        console.error("Err in Battle Net action", e)
        throw e
    }
}

export {
    battleNetAction
}
