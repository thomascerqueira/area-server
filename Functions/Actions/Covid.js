import httpRequest from "../httpRequest.js";
import {checkOption} from "./CheckOption.js";

async function covidAction(data) {
  try {
    let result = await httpRequest(
      `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/${data['country']}/${data['iso']}`,
      "get",
      {},
      {
        'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
        'x-rapidapi-key': `${process.env.COVID_KEY}`
      }
    )
    if (result.data.length > 0) {
      return (checkOption(data['option'], result.data[0]['ActiveCases'], data['value']))
    }
    return false
  } catch (e) {
    console.error("Err in covidAction", e)
    throw e
  }
}

export {
  covidAction
}
