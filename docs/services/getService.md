# Get Service

- [Get Service](#get-service)
    - [Description](#description)
    - [Success Response](#success-response)
    - [Error Response](#error-response)

**URL**: [/services/getUser]()

**Method**: `GET`

---

## Description
&emsp;Use to get actions reactions of a user  `service`

**Header**

```json
{
  "tokenid": "'Bearer' + tokenId from firebase"
}
```

---
## Success Response

**Code**: `200 OK`

**Content**

```json
{
  "id": "ID of the action/reaction": string,
  "actionService": "Name of the service for the action": string,
  "actionElement": "Name of the element of the action": string,
  "inputAction": "Input needed for the service action": string,
  "reactionService": "Name of the service for the reaction": string,
  "reactionElement": "Name of the element of the reaction": string,
  "inputReaction": "Input needed for the service reaction": string,
}
```
---
## Error Response

**Code**: `404 not found`


<table>
<tr>
<td> Status </td> <td> Condition </td> <td> Response </td>
</tr>

<tr>
<td> 404 </td>
<td>If error from Firebase</td>
<td>

```json
{
  "firebaseError": ""
}
```

</td>
</tr>

</table>
