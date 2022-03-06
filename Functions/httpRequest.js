import axios from "axios"

export default async function httpRequest(url, method="get", data=undefined, headers={
  'Content-Type': 'application/json'
}) {
  try {
    return await axios( {
      method: method,
      url: url,
      data: data,
      headers: headers
    })
  } catch (err) {
    console.log("in http error", err)
    throw err.response
  }
}