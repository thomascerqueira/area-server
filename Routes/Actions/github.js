import express from 'express';
import {create_route_from_routes, check_arg} from '../../Functions/createroutefromroutes.js'
import {getActions, getWebHooks} from "../../Middleware/Actions/github.js"

const routes = [
    {
        type: 'get',
        route: '/getActions',
        middlewares: [],
        callback: getActions
    },
    {
        type: 'post',
        route: '/hooks',
        middlewares: [],
        callback: getWebHooks
    }
]

export default create_route_from_routes(routes)