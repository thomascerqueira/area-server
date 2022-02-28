# Weather

## Description
The available actions are:
<table>
<tr>
<td> Name </td> <td> Description </td>
</tr>
<tr>
<td>temperature </td>
<td>Action relative to the temperature</td>
</tr>
<tr>
<td>pollution </td>
<td>Action relative to the pollution</td>
</tr>
</table>

### temperature
For the Action `temperature`
```json
{
  "city": "Name of the City to check": string,
  "temp": "Temperature to check": number,
  "option": "greater, less, equal; check to validate the reaction"
}
```

Example:
```json
{
  "city": "Paris",
  "temp": 20,
  "option": "greater"
}
```
The reaction will occur if the temperature of `Paris` is `greater` than `20` degrees 

---

For the Action `pollution`
```json
{
  "value": "Value of the air quality to check": number between 1 and 5,
  "long": "Longitude of the place": number,
  "lat": "Latitude of the place": number,
  "option": "greater, less, equal; check to validate the reaction"
}
```

Example:
```json
{
  "value": 2,
  "long": 2.0,
  "lat": 4.0,
  "option": "greater"
}
```
The reaction will occur if the air quality at `2.0,4.0` is `greater` than `2` air quality 

