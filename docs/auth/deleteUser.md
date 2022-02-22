# DeleteUser
- [DeleteUser](#deleteUser)
    - [Description](#description)
    - [Success Response](#success-response)
    - [Error Response](#error-response)

**URL**: [/auth/deleteUser]()

**Method**: `POST`

---

## Description
&emsp;Use to delete a user in firebase with `token`


**Data constraints**

```json
{
  "tokenID": "TokenID provided by firebase": string
}
```

**Data example**

```json
{
  "tokenID": "4f5sd7gf1k564sdf7..."
}
```
---
## Success Response

**Code**: `200 OK`

**Content**

```json
{
  "msg": "User deleted": string
}
```
---
## Error Response

<table>
<tr>
<td> Status </td> <td> Condition </td> <td> Response </td>
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