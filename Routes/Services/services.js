import express from 'express';
import {create_route_from_routes, check_arg} from '../../Functions/createroutefromroutes.js'
import {getAllServices, getServicesUser} from '../../Middleware/Services/services.js'

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
    }
]

export default create_route_from_routes(routes)
