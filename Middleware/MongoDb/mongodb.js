import {allDb} from "../../config.js";
import {parseNameDb} from "../../Functions/parseNameDB.js";
import {dropCollection} from "../../Functions/MongoDB/dropCollection.js";
import {addDocC} from '../../Functions/MongoDB/addDoc.js'
import {createCollection} from '../../Functions/MongoDB/createCollection.js'
import {getOneValueDb} from "../../Functions/MongoDB/getValueDb.js";

function createColl(req, res) {
    let db = parseNameDb(req.body.db)
    if (!db)
        res.status(404).send({
            'msg': `${req.body.db} is not a DB valid`
        })
    else {
        createCollection(db, req.body.name)
            .then((e) => {
                res.status(200).send(e)
            })
            .catch(err => {
                res.status(500).send(err)
            })
    }
}

function deleteCollection(req, res) {
    let db = parseNameDb(req.body.db)
    if (!db)
        res.status(404).send({
            'msg': `${req.body.db} is not a DB valid`
        })
    else {
        dropCollection(db, req.body.name)
            .then((e) => {
                res.status(200).send(e)
            })
            .catch(err => {
                res.status(500).send(err)
            })
    }
}

function addDoc(req, res) {
    let db = parseNameDb(req.body.db)
    if (!db)
        res.status(404).send({
            'msg': `${req.body.db} is not a DB valid`
        })
    else {
        addDocC(db, req.body.collection, req.body.doc)
            .then(() => {
                res.status(200).send({
                    'msg': 'added successful'
                })
            })
            .catch(err => {
                res.status(500).send(err)
            })
    }
}

function getOneValue(req, res) {
    let db = parseNameDb(req.body.db)
    if (!db)
        res.status(404).send({
            'msg': `${req.body.db} is not a DB valid`
        })
    else {
        getOneValueDb(db, req.body.collection, req.body.doc)
            .then((e) => {
                res.status(200).send(e)
            })
            .catch(err => {
                res.status(500).send(err)
            })
    }
}

export {
    createColl,
    deleteCollection,
    addDoc,
    getOneValue
}