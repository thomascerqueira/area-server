import httpRequest from "../httpRequest";

async function createDiscordReaction(options) {
	try {
		let result = await httpRequest(
			`https://discord.com/api/channels/${options.channel_id.toString()}/webhooks`
		)
		return options
	} catch (err) {
		throw err
	}
}

export {
    createDiscordReaction,
}