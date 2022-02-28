# Sign User Provider
- [Sign User Provider](#sign-user-provider)
    - [Description](#description)
    - [Success Response](#success-response)
    - [Error Response](#error-response)

**URL**: [/auth/signUserProvider]()

**Method**: `POST`

---

## Description
&emsp;Use to sign a user in firebase with a provider

**Header**

```json
{
  "tokenid": "'Bearer' + tokenId from firebase": string
}
```

**Data constraints**

```json
{
  "user": "user settings provided by firebase": {}
}
```

**Data example**

```json
{
  "user": "..."
}
```
---
## Success Response

**Code**: `200 OK`

**Content**

```json
{
  ".data": {
    "value from db"
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
