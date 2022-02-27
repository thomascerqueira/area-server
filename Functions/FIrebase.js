import {admin, allDb} from '../config.js';

function addValueArray(nameCollection, nameDoc, nameArray, data) {
  const db = admin.firestore()
  const dbRef = db.collection(nameCollection).doc(nameDoc)

  console.log("data ", data)
  dbRef.update({
    nameArray: admin.firestore.FieldValue.arrayUnion(data)
  })
    .then(() => {})
    .catch(err => {
      throw err
    })
}


export {
  addValueArray
}
