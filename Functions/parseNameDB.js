import {allDb} from "../config.js";

/**
 * Return the corresponding db
 * @param name name of the db wanted
 * @returns {*}
 */
function parseNameDb(name) {
    try {
        return allDb[name]
    } catch (e) {
        return false
    }
}

export {
    parseNameDb
}