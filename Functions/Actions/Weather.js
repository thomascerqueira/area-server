import httpRequest from '../httpRequest.js';
import {checkOption} from "./CheckOption.js";

async function weatherActionTemp(data) {
  try {
    let result = await httpRequest(
      `http://api.openweathermap.org/data/2.5/weather?q=${data['city']}&appid=${process.env.OPEN_WEATHER_KEY}&units=metric`,
      "get"
    )
    return checkOption(data['option'], result.data.main['temp'], data['temperature'])
  } catch (e) {
    console.error("Err in Weather Temp action", e)
    throw e
  }
}

async function weatherActionPoll(data) {
  try {
    let result = await httpRequest(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${data['lat']}&lon=${data['long']}&appid=${process.env.OPEN_WEATHER_KEY}`)
    return checkOption(data['option'], result.data.main['aqi'], data['value'])
  } catch (e) {
    console.error("Err in Weather pollution action", e)
    throw e
  }
}

export {
  weatherActionTemp,
  weatherActionPoll
}
