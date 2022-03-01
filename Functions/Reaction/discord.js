import httpRequest from "../httpRequest.js";

async function createDiscordReaction(options, _) {
  try {
    let result = await httpRequest(
      `https://discord.com/api/channels/${options.channel_id.toString()}/webhooks`,
      'post',
      {
        name: "test"
      },
      {
        "Authorization": `${process.env.DISCORD_KEY}`
      }
    )
    console.log(result)
    options.webhooks_id = result.data.id;
    options.webhooks_token = result.data.token;
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
      'post',
      {
        'content': "NIQUE SA MERE"
      }
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
