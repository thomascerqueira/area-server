import httpRequest from "../httpRequest.js"

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
    return result.data.coins[0].uuid
  } catch (e) {
    console.error("Err in coinranking action", e)
    throw e
  }
}

async function coinrankingGetCoin(data) {
  try {
    uuid = coinrankingGetUuid(data['name'])
    let result = await httpRequest(
      `https://api.coinranking.com/v2/coin/${uuid}/price`,
      "get",
      {},
      {
        'x-access-token': `${process.env.COINRANKING_KEY}`
      }
    )
    return (checkOption(data['option'], result.data['price'], data['value']))
  } catch (e) {
    console.error("Err in coinranking action", e)
    throw e
  }
}

export {
  coinrankingGetCoin
}