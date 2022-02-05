import { sendMail } from "../sendMail";

const reaction = {"send_mail": sendMail}

async function dispatchReaction(payload) {
    reaction[payload.reaction.reactionName](payload.reaction.data)
}

export {
    dispatchReaction
}