import { sendMail } from "../sendMail.js";
import {executeDiscordReaction} from "./discord.js";

const reaction = {
    "send_mail": sendMail,
    "sendMessage": executeDiscordReaction
}

function getBodyReaction(reactionData, actionData, result) {
    let body
    switch (actionData.service) {
        case 'Spotify':
            body = JSON.stringify(result)
            break
        case 'Weather':
            let type
            let city
            if (actionData.actionName === "pollution") {
                const indices = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor']
                let index = actionData.data.value - 1
                let check

                switch (actionData.data.option) {
                    case 'greater':
                        check = "has exceeded"
                        break
                    case 'less':
                        check = "dropped behind"
                        break
                    case 'equal':
                        check = "is equal to"
                        break
                }
                if (index < 0) {
                    index = 0
                } else if (index > 5) {
                    index = 5
                }
                city = `Latitude = ${actionData.data.lat}, Longitude = ${actionData.data.long}`
                type = `air quality ${check} ${indices[index]}`
            } else if (actionData.actionName === "temperature") {
                const check = actionData.data.option === "equal" ? "to" : "than"
                city = actionData.data.city
                type = `temperature is ${actionData.data.option} ${check} ${actionData.data.temperature}`
            }
            body = `The ${type} in ${city}`
            break
        default:
            body = "REACTION"
            break
    }
    return body
}

async function dispatchReaction(payload, result) {
    const reac = payload.reaction
    const act = payload.action
    const bodyReaction = getBodyReaction(reac, act, result)

    reaction[reac.reactionName](reac.data, "reaction", {
        service: act.service,
        value: bodyReaction
    })
}

export {
    dispatchReaction
}
