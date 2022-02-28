# Weather

## Description

For any ActionReaction from github we need:
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
