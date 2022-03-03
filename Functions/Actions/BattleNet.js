import httpRequest from "../httpRequest.js";
import { checkOption } from "./Weather.js";

async function battleNetAction(data) {
    try {
        let result = await httpRequest(
            `https://eu.api.blizzard.com/data/wow/token/index?namespace=dynamic-eu&locale=fr_FR`,
            "get",
            {},
            {
                "Authorization": `Bearer ${data.battleNetAccessToken}`
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