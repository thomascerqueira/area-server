import Mongodb from "mongodb";

/**
 * Create a collection in the db
 * @param {Mongodb.Db} db database
 * @param {string} collection name of the collection
 * @returns {Promise<{msg: string}>}
 */
async function createCollection (db, collection) {
    try {
        await db.createCollection(collection)
        return {'msg': 'created successfully'}
    } catch (e) {
        throw e
    }
}

export {
    createCollection
}