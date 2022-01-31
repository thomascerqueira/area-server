import Mongodb from "mongodb";

/**
 * add a document in the db
 * @param {Mongodb.Db} db database
 * @param {string} collection name of the collection
 * @param {{}} doc JSON document to add
 * @returns {Promise<{msg: string}>}
 */
async function addDocC (db, collection, doc) {
    try {
        await db.collection(collection).insertOne(doc)
        return {'msg': 'add successfully'}
    } catch (e) {
        throw e
    }
}

export {
    addDocC
}