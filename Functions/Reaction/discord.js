import httpRequest from "../httpRequest.js";

async function createDiscordReaction(options, _) {
  try {
    let result = await httpRequest(
      `https://discord.com/api/channels/${options.channel_id.toString()}/webhooks`,
      'post',
      {
        name: `${options.name}`
      },
      {
        "Authorization": `${process.env.DISCORD_KEY}`
      }
    )
    options.webhooks_id = result.data.id.toString();
    options.webhooks_token = result.data.token.toString();
    return options
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function updateDiscordReaction(options) {
  try {
    let result = await httpRequest(
      `https://discord.com/api/webhooks/${options.webhooks_id.toString()}`,
      'patch'
    )
  } catch (err) {
    throw err
  }
}

async function deleteDiscordReaction(options) {
  try {
    let result = await httpRequest(
      `https://discord.com/api/webhooks/${options.webhooks_id}/${options.webhooks_token}`,
      'delete'
    )
    return true
  } catch (err) {
    throw err
  }
}

async function executeDiscordReaction(options, _, body) {
  try {
    let result = await httpRequest(
      `https://discord.com/api/webhooks/${options.webhooks_id.toString()}/${options.webhooks_token.toString()}`,
      'post',
      {
        'content': body.value
      }
    )
    return true
  } catch (err) {
    throw err
  }
}

export {
  createDiscordReaction,
  updateDiscordReaction,
  deleteDiscordReaction,
  executeDiscordReaction,
}
