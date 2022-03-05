async function updateDoc(db, collection, doc, value) {
  try {
    await db.collection(collection).updateOne(doc, value)
    return {'msg': 'Updated successfully'}
  } catch (e) {
    throw e
  }
}

export {
  updateDoc
}
