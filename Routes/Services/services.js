import express from 'express';
import {create_route_from_routes, checkValidator} from '../../Functions/createroutefromroutes.js'
import {getAllServices, getServicesUser, updateServices} from '../../Middleware/Services/services.js'
import {checkToken} from "../../Functions/checkArg/checkToken.js";
import {checkSchema} from 'express-validator'

const routes = [
    {
        type: 'get',
        route: '/getAll',
        middlewares: [],
        callback: getAllServices
    },
    {
        type: 'get',
        route: '/getUser',
        middlewares: [checkSchema({
            tokenid: checkToken
        }), checkValidator()],
        callback: getServicesUser
    },
    {
        type: 'patch',
        route: '/',
        middlewares: [],
        callback: updateServices
    }
]

export default create_route_from_routes(routes)
