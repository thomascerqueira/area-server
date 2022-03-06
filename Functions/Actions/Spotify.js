import httpRequest from "../httpRequest.js";
import { allDb } from "../../config.js"
import {getOneValueDb} from "../MongoDB/getValueDb.js";

async function spotifyNewReleaseAction(data, uid) {
  try {
    const user = await getOneValueDb(allDb['UsersDB'], 'users', {
			uid: uid
		})
		const token = user['services']['spotify']['token']

    let result = await httpRequest(
      "https://api.spotify.com/v1/browse/new-releases",
      "get",
      null,
      {
        "Authorization": `Bearer ${token}`,
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
    const user = await getOneValueDb(allDb['UsersDB'], 'users', {
			uid: uid
		})
		const token = user['services']['github']['token']

    let result = await httpRequest(
      "https://api.spotify.com/v1/recommendations",
      "get",
      null,
      {
        "Authorization": `Bearer ${token}`,
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