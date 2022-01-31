import {addDoc, createColl, deleteCollection, getOneValue} from "../../Middleware/MongoDb/mongodb.js";
import {create_route_from_routes, check_arg} from '../../Functions/createroutefromroutes.js'

const routes = [
    {
        type: 'post',
        route: '/createCollection',
        middlewares: [check_arg(['db', 'name'])],
        callback: createColl
    },
    {
        type: 'delete',
        route: '/deleteCollection',
        middlewares: [check_arg(['db', 'name'])],
        callback: deleteCollection
    },
    {
        type: 'post',
        route: '/addDoc',
        middlewares: [check_arg(['db', 'collection', 'doc'])],
        callback: addDoc
    },
    {
        type: 'get',
        route: '/getValue',
        middlewares: [check_arg(['db', 'collection', 'doc'])],
        callback: getOneValue
    }
]

export default create_route_from_routes(routes)