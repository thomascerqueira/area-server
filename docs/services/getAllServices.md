# Get All Services

- [Get All Services](#get-All-Services)
    - [Description](#description)
    - [Success Response](#success-response)

**URL**: [/services/getAll]()

**Method**: `GET`

---

## Description
&emsp;Use to get all services available

---

## Success Response

**Code**: `200 OK`

**Content**

List of all services available

```json
{
  "services": [
    {
      "name": "name of the service" : string,
      "reactions": ["Reaction of the services"] : array,
      "actions": ["Action of the services"] : array
    }
  ]
}
```

```Reactions``` and ```Actions``` have the same body type as follow:
```json
{
  "name": "Name of the action/reaction" : string,
  "inputs": /*inputs needed from the action reaction*/ [
    {
      "name": "name of the input" : string,
      "type": "type of the input" : string
    }
  ]
}
```
