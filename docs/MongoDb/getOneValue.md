# GetOneValue
- [GetOneValue](#getonevalue)
  - [Description](#description)
  - [Success Response](#success-response)
  - [Error Response](#error-response)


**URL**: [/mongoDb/createCollection]()

**Method**: `POST`

---

## Description
&emsp;Use to get value in the mongoDB when a doc contain the value `doc` 


**Data constraints**
```json
{
  "db": "Name of the database": string,
  "name": "Name of the collection": string,
  "doc": "Json that the Doc have to have": {}
}
```

**Data example**
```json
{
  "db": "testDB",
  "name": "User",
  doc": {
    "user": "user",
    {...}
  }
}
```


---


##Success Response

**Code**: `200 OK`

**Content**
```
{
 return of the Mongodatabase
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
