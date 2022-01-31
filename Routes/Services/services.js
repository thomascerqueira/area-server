import express from 'express';
import {create_route_from_routes, check_arg} from '../../Functions/createroutefromroutes.js'
import {getAllServices, getService} from '../../Middleware/Services/services.js'

const routes = [
    {
        type: 'get',
        route: '/getAll',
        middlewares: [],
        callback: getAllServices
    },
    {
        type: 'get',
        route: '/get',
        middlewares: [check_arg(['service'])],
        callback: getService
    }
]

export default create_route_from_routes(routes)