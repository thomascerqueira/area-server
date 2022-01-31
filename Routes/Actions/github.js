import express from 'express';
import {create_route_from_routes, check_arg} from '../../Functions/createroutefromroutes.js'
import {getActions, getPushWebHooks} from "../../Middleware/Actions/github.js"

const routes = [
    {
        type: 'get',
        route: '/getActions',
        middlewares: [],
        callback: getActions
    },
    {
        type: 'post',
        route: '/push',
        middlewares: [],
        callback: getPushWebHooks
    }
]

export default create_route_from_routes(routes)