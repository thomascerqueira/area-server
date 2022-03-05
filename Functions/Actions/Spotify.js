import httpRequest from "../httpRequest.js";

async function spotifyNewReleaseAction(data, uid) {
  try {
    let result = await httpRequest(
      "https://api.spotify.com/v1/browse/new-releases",
      "get",
      {},
      {
        "Authorization": `Berear `,
        "Content-Type": "application/json"
      }
    )
    if (result.data.length > 0)
      return result
    return false
  } catch (e) {
    console.error("Err in Spotify action", e)
    throw e
  }
}

async function spotifyNewRecommendations(data, uid) {
  try {
    let result = await httpRequest(
      "https://api.spotify.com/v1/recommendations",
      "get",
      {},
      {
        "Authorization": `Berear `,
        "Content-Type": "application/json"
      }
    )
    if (result.data.length > 0)
      return result
    return false
  } catch (e) {
    console.error("Err in Spotify action", e)
    throw e
  }
}

export {
  spotifyNewReleaseAction,
  spotifyNewRecommendations
}