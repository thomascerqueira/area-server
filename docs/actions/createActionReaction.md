# Create Action Reaction

- [Create Action Reaction](#create-Action-Reaction)
    - [Description](#description)
    - [Success Response](#success-response)
    - [Error Response](#error-response)

**URL**: [/actions/createActionReaction]()

**Method**: `POST`

---

## Description

&emsp;Use to create an action reaction

**Header**

```json
{
  "tokenid": "'Bearer' + tokenId from firebase"
}
```

**Data constraints**

```json
{
  "action": {
    "service": "Name of the services" : string,
    "actionName": "Name of the action element" : string,
    "data": "Data needed by the action" : {}
  },
  "reaction": {
    "service": "Name of the service for the reaction": string,
    "reactionName": "Name of the reaction element": string,
    "data": "Data needed by the reaction": {}
  },
  "title": "Title Of the ActionReaction"
}
```

**Data example**

```json
{
  "action": {
    "service": "GitHub",
    "actionName": "push",
    "data": {
      "githubName": "python",
      "repository": "numpy",
      "events": "push",
      "token": "tokenGithub"
    }
  },
  "reaction": {
    "service": "Area",
    "reactionName": "send_mail",
    "data": {
      "email": "user.email@gmail.com",
      "object": "reaction push"
    }
  },
  "title": "Test"
}
```

---

## Success Response

**Code**: `200 OK`

**Content**

```json
{
  "msg": "add successfully"
}
```

---

## Error Response

<table>
<tr>
<td> Status </td> <td> Condition </td> <td> Response </td>
</tr>

<tr>
<td> 401 </td>
<td>Bad token</td>
<td>

```json
{
  "msg": "Bad format Token"
     or firebaseError
}
```

</td>
</tr>

<tr>
<td> 404 </td>
<td>If <code>actionName</code> is found or error while creating action </td>
<td>

```json
{
  "msg": "Error while creating, maybe its an unknown actionName or internal server error"
}
```

</td>
</tr>
<tr>
<td> 500 </td>
<td>If Other error </td>
<td>

```json
{
  "Depend of the error"
}
```

</td>
</tr>
</table>
