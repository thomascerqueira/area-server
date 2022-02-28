# Create User
- [Create User](#create-user)
    - [Description](#description)
    - [Success Response](#success-response)
    - [Error Response](#error-response)

**URL**: [/auth/createUser]()

**Method**: `POST`

---

## Description
&emsp;Use to create a user in firebase with `email` `password` and `username`


**Data constraints**

```json
{
  "email": "valid email address": string,
  "password": "password in plain text": string,
  "username": "valid username": string
}
```

**Data example**

```json
{
  "email": "alexi@gmail.com",
  "password": "azerty2-",
  "username": "alexisFab"
}
```
---
## Success Response

**Code**: `200 OK`

**Content**

```json
{
  "msg": "User created please verify your email": string
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
<td>If <code>username</code>, <code>email</code>, <code>password</code> are wrong or error in firebase</td>
<td>

```
firebase error
```

</td>
</tr>

</table>
