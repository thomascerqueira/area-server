import Mongodb from "mongodb";

/**
 * Drop a collection from a db
 * @param {Mongodb.Db} db database
 * @param {string} collection name of the collection
 */
async function dropCollection(db, collection) {
  try {
    await db.collection(collection).drop()
    return {'msg': 'delete successful'}
  } catch (err) {
    throw err
  }
}

async function dropDocument(db, collection, data) {
  try {
    await db.collection(collection).deleteOne(data)
    return {'msg': 'delete successful'}
  } catch (err) {
    throw err
  }
}

export {
  dropCollection,
  dropDocument,
}
