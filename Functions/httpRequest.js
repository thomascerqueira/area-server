import axios from "axios"

export default async function httpRequest(url, method="get", data={}, headers={
  'Accept': 'application/json'
}) {
  try {
    return await axios({
      method: method,
      url: url,
      data: data,
      config: {
        headers: headers
      }
    })
  } catch (err) {
    console.log("in http error", err)
    throw err.response
  }
}