import {admin, allDb} from '../config.js';

function addValueArray(nameCollection, nameDoc, nameArray, data) {
  const db = admin.firestore()
  const dbRef = db.collection(nameCollection).doc(nameDoc)

  const newData = {}
  newData[nameArray] = {
    data
  }

  dbRef.update(newData)
    .then(() => {})
    .catch(err => {
      throw err
    })
}

function removeValueArray(nameCollection, nameDoc, nameArray, data) {
  const db = admin.firestore()
  const dbRef = db.collection(nameCollection).doc(nameDoc)

  const newData = {}
  newData[nameArray] = admin.firestore.FieldValue.arrayRemove(data)

  dbRef.update(newData)
    .then(() => {})
    .catch(err => {
      throw err
    })
}


export {
  addValueArray,
  removeValueArray
}
