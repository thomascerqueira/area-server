import httpRequest from '../httpRequest.js';

async function weatherActionTemp(city, temp, option, reaction) {
  try {
    let result = await httpRequest(
      `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_KEY}`,
      "get"
    )
    console.log(result)
    return false;
  } catch (e) {
    console.error("Err create Weather Temp action", e)
    throw e
  }
}

export {
  weatherActionTemp
}
