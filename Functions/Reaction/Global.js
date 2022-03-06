import { sendMail } from "../sendMail.js";
import {executeDiscordReaction} from "./discord.js";

const reaction = {
    "send_mail": sendMail,
    "sendMessage": executeDiscordReaction
}

function prettyPrintSpotify(name, image, url)  {
    return (
      `<div style="display: grid; grid-template-columns: repeat(2, 1fr); padding-bottom: 5px"><div>${name}</div><img src=${image.url} height=${image.height} width=${image.width}/><a style="grid-column: 2 / 2" href=${url}>${url}</a><br/><br/><br/><br/></div>`
    )
}

function getBodyReaction(reactionData, actionData, result) {
    let body = ""
    let check
    switch (actionData.service) {
        case 'Covid':
            check = actionData.data.option === "equal" ? "to" : "than"
            body = `The number of contamination is ${actionData.data.option} ${check} ${actionData.data.value} in ${actionData.data.country}`
            break
        case 'Spotify':
            if (actionData.actionName === "newRelease") {
                const items = result.data.albums.items
                items.forEach((item) => {
                    if (reactionData.service === "Discord")
                        body += item.name + ": " + item.external_urls.spotify + '\n'
                    else
                        body += prettyPrintSpotify(item.name, item.images[item.images.length - 1], item.external_urls.spotify)
                })
            } else {
                const items = result.data.tracks
                items.forEach((item) => {
                    if (reactionData.service === "Discord")
                        body += item.name + ": " + item.external_urls.spotify + '\n'
                    else
                        body += prettyPrintSpotify(item.name, item.album.images[item.album.images.length - 1], item.external_urls.spotify)
                })
            }
            break
        case 'Weather':
            let type
            let city
            if (actionData.actionName === "pollution") {
                const indices = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor']
                let index = actionData.data.value - 1

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
        case 'CoinRanking':
            check = actionData.data.option === "equal" ? "to" : "than"
            body = `The price of ${actionData.data.name} is ${actionData.data.option} ${check} ${actionData.data.value}`
            break
        case 'battleNet':
            check = actionData.data.option === "equal" ? "to" : "than"
            body = `The price of WOW token is ${actionData.data.option} ${check} ${actionData.data.value}`
            break
        case 'GitHub':
            body = `There is a ${actionData.data.events} in the repo ${actionData.data.repository} of the user ${actionData.data.githubName}`
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
