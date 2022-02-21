import Mongodb from "mongodb";

/**
 * get the first value containing the doc in the db
 * @param {Mongodb.Db} db database
 * @param {string} collection name of the collection
 * @param {{}} doc JSON document contained
 * @returns {Promise<*>}
 */
async function getOneValueDb(db, collection, doc) {
  try {
    return await db.collection(collection).findOne(doc)
  } catch (e) {
    throw e
  }
}

/**
 * get the all value containing the doc in the db
 * @param {Mongodb.Db} db database
 * @param {string} collection name of the collection
 * @param {{}} doc JSON document contained
 * @returns {Promise<*>}
 */
async function getAllValueDb(db, collection, doc) {
  try {
    return await db.collection(collection).find(doc).toArray()
  } catch (e) {
    throw e
  }
}

export {
  getOneValueDb,
  getAllValueDb
}
