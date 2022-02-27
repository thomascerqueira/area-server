import httpRequest from '../httpRequest.js';

async function weatherActionTemp(data) {
  try {
    let result = await httpRequest(
      `http://api.openweathermap.org/data/2.5/weather?q=${data['city']}&appid=${process.env.OPEN_WEATHER_KEY}&units=metric`,
      "get"
    )
    switch (data['option']) {
      case 'less':
        if (result.data.main['temp'] <= data['temp']) {
          return true;
        }
        break
      case 'more':
        if (result.data.main['temp'] >= data['temp']) {
          return true;
        }
        break
      case 'equal':
        if (result.data.main['temp'] === data['temp']) {
          return true;
        }
        break;
      default:
        return false
    }
    return false;
  } catch (e) {
    console.error("Err create Weather Temp action", e)
    throw e
  }
}

export {
  weatherActionTemp
}
