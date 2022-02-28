import httpRequest from "../httpRequest.js";

async function createDiscordReaction(options) {
  try {
    let result = await httpRequest(
      `https://discord.com/api/channels/${options.channel_id.toString()}/webhooks`,
      'post',
      {
        Authorization: `${options.token}`
      }
    )
    console.log(result)
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
      `https://discord.com/api/webhooks/${options.webhooks_id.toString()}`,
      'delete',
      {
        Authorization: `${options.token}`
      }
    )
  } catch (err) {
    throw err
  }
}

async function executeDiscordReaction(options) {
  try {
    let result = await httpRequest(
      `https://discord.com/api/webhooks/${options.webhooks_id.toString()}/${options.webhooks_token.toString()}`,
      'post'
    )
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