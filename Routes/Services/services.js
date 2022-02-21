import express from 'express';
import {create_route_from_routes, check_arg} from '../../Functions/createroutefromroutes.js'
import {getAllServices, getServicesUser, updateServices} from '../../Middleware/Services/services.js'

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
        middlewares: [check_arg(['tokenID'])],
        callback: getServicesUser
    },
    {
        type: 'get',
        route: '/updateServices',
        middlewares: [],
        callback: updateServices
    }
]

export default create_route_from_routes(routes)
