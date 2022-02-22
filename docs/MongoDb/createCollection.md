# CreateCollection
- [CreateCollection](#createCollection)
    - [Description](#description)
    - [Success Response](#success-response)
    - [Error Response](#error-response)

**URL**: [/mongoDb/createCollection]()

**Method**:  `POST`

---

## Description
&emsp;Use to create a collection `name` in the database `db`

**Data constraints**
```json
{
  "db": "Name of the database": string,
  "name": "Name of the collection": string
}
```

**Data example**
```json
{
  "db": "testDB",
  "name": "User"
}
```
---
## Success Response

**Code**: `200 OK`

**Content**
```json
{
  "msg": "created successfully": string
}
```
---
## Error Response
<table>
<tr>
<td> Status </td> <td> Condition </td> <td> Response </td>
</tr>

<tr>
<td> 404 </td>
<td>If the Db asked doesn't exists</td>
<td>

```json
{
  "msg": "${db} is not a DB valid": string
}
```

</td>
</tr>

<tr>
<td> 500 </td>
<td>If error in firebase</td>
<td>

```
firebase error
```
</td>
</tr>

</table>