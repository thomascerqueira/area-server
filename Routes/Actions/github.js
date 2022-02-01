import express from 'express';
import {create_route_from_routes, check_arg, check_header} from '../../Functions/createroutefromroutes.js'
import {getWebHooks} from "../../Middleware/Actions/github.js"

const routes = [
    {
        type: 'post',
        route: '/hooks',
        middlewares: [check_header(['x-github-event', 'x-github-hook-id', 'x-github-hook-installation-target-id', 'x-github-hook-installation-target-type'])],
        callback: getWebHooks
    }
]

export default create_route_from_routes(routes)