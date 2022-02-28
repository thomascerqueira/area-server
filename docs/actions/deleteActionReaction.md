# Delete Action Reaction

- [Delete Action Reaction](#delete-action-reaction)
    - [Description](#description)
    - [Success Response](#success-response)
    - [Error Response](#error-response)

**URL**: [/actions]()

**Method**: `DELETE`

---

## Description
&emsp;Use to delete an ActionReaction from an User

**Header**

```json
{
  "tokenid": "'Bearer' + tokenId from firebase" : string
}
```

**Data constraints**

```json
{
  "id": "ID of the ActionReaction": string
}
```

**Data example**

```json
{
  "id": "5f7ds65": string
}
```

---
## Success Response

**Code**: `200 OK`

**Content**

```json
{
  "msg": "Deleted successfully": string,
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
<td> 500 </td>
<td>If firebase error</td>
<td>

```json
{
  "firebaseError": ""
}
```

</td>

<tr>
<td> 500 </td>
<td>If mongo error</td>
<td>

```json
{
  "mongoDbError": ""
}
```

</td>
</tr>

</table>
