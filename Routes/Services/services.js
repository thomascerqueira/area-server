import express from 'express';
import {create_route_from_routes, check_arg, check_header} from '../../Functions/createroutefromroutes.js'
import {deleteService, getAllServices, getServicesUser, updateServices} from '../../Middleware/Services/services.js'

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
        middlewares: [check_header(['tokenid'])],
        callback: getServicesUser
    },
    {
        type: 'get',
        route: '/update',
        middlewares: [],
        callback: updateServices
    },
    {
        type: 'delete',
        route: '/',
        middlewares: [check_header(['tokenid']), check_arg(['id'])],
        callback: deleteService
    }
]

export default create_route_from_routes(routes)
