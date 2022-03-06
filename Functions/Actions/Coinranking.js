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
    console.log(result.data.data.coins[0].uuid)
    return result.data.data.coins[0].uuid
  } catch (e) {
    console.error("Err in coinranking action", e)
    throw e
  }
}

async function coinrankingGetCoin(data) {
  try {
    let result = coinrankingGetUuid(data['name'])
    const uuid = result.data.uuid
    result = await httpRequest(
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