import axios from "axios"

export default async function httpRequest(url, method="get", data={}) {
  try {
    return await axios({
      method: method,
      url: url,
      data: data
    })
  } catch (err) {
    console.log("in http error", err)
    throw err.response
  }
}