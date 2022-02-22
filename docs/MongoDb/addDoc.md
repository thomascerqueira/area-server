# AddDoc
- [AddDoc](#adddoc)
    - [Description](#description)
    - [Success Response](#success-response)
    - [Error Response](#error-response)


**URL**: [/mongoDb/addDoc]()

**Method**: `POST`

---

## Description
&emsp;Use to add a doc `doc` in the collection `collection` in the database `db`

**Data constraints**
```json
{
  "db": "Name of the database": string,
  "collection": "Name of the collection": string,
  "doc": "Json of the doc to add": string
}
```

**Data example**
```json
{
  "db": "testDB",
  "name": "User",
  "doc": {
    "user": "user",
    {...}
  }
}
```
---
## Success Response

**Code**: `200 OK`

**Content**
```json
{
  "msg": "added successfully": string
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