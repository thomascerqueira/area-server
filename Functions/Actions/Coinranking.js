import httpRequest from "../httpRequest.js"
import {checkOption} from "./CheckOption.js";

async function coinrankingGetUuid(name) {
  try {
    let result = await httpRequest(
      `https://api.coinranking.com/v2/search-suggestions?query=${name}`,
      "get",
      {},
      {
        'x-access-token': `${process.env.COINRANKING_KEY}`
      }
    )
    return result.data.data.coins[0].uuid
  } catch (e) {
    console.error("Err in coinranking action", e)
    throw e
  }
}

async function coinrankingGetCoin(data) {
  try {
    const uuid = await coinrankingGetUuid(data['name'])
    let result = await httpRequest(
      `https://api.coinranking.com/v2/coin/${uuid}/price`,
      "get",
      {},
      {
        'x-access-token': `${process.env.COINRANKING_KEY}`
      }
    )
    return (checkOption(data['option'], result.data.data['price'], data['value']))
  } catch (e) {
    console.error("Err in coinranking action", e)
    throw e
  }
}

export {
  coinrankingGetCoin
}
