import { sendMail } from "../sendMail.js";
import {executeDiscordReaction} from "./discord.js";

const reaction = {
    "send_mail": sendMail,
    "sendMessage": executeDiscordReaction
}

async function dispatchReaction(payload) {
    reaction[payload.reaction.reactionName](payload.reaction.data)
}

export {
    dispatchReaction
}
