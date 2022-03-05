# Get Info User
- [Get Info User](#get-info-user)
    - [Description](#description)
    - [Success Response](#success-response)
    - [Error Response](#error-response)

**URL**: [/auth/]()

**Method**: `GET`

---

## Description
&emsp;Use to get info of the user with `tokenid`


**Header**

```json
{
  "tokenid": "'Bearer' + tokenId from firebase" : string
}
```

---
## Success Response

**Code**: `200 OK`

**Content**

```json
{
  "uid": "uid of the user",
  "email": "email of the user",
  "name": "Name of the user",
  "services" : "services of the users"
}
```

`serivces` is :

```json
{
  "service": {
    "token": "token for the service",
    "refresh_token": "refresh token for the service",
    "connected": "If the user have activated this service"
  }
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
<td>If <code>uid</code> is wrong or error in firebase</td>
<td>

```
firebase error
```

</td>
</tr>

</table>
