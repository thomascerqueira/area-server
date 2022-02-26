import {admin, allDb} from '../config.js';

function addValueArray(nameCollection, nameDoc, data) {
  const db = admin.firestore()
  const dbRef = db.collection(nameCollection).doc(nameDoc)

  dbRef.update(admin.firestore.FieldValue.arrayUnion(data))
    .then(() => {})
    .catch(err => throw err)
}


export {
  addValueArray
}
