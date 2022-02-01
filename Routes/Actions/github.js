import express from 'express';
import {create_route_from_routes, check_arg, check_header} from '../../Functions/createroutefromroutes.js'
import {getWebHooks, createGithubAction, deleteGithubAction, updateGithubAction, getGithubAction} from "../../Middleware/Actions/github.js"

const routes = [
    {
        type: 'post',
        route: '/hooks',
        middlewares: [check_header(['x-github-event', 'x-github-hook-id', 'x-github-hook-installation-target-id', 'x-github-hook-installation-target-type'])],
        callback: getWebHooks
    },
    {
        type: 'get',
        route: '/get/:id',
        middlewares: [],
        callback: getGithubAction
    },
    {
        type: 'post',
        route: '/create',
        middlewares: [check_arg(['githubName', 'repository', 'token'])],
        callback: createGithubAction
    },
    {
        type: 'delete',
        route: '/delete/:id',
        middlewares: [],
        callback: deleteGithubAction
    },
    {
        type: 'patch',
        route: '/update/:id',
        middlewares: [],
        callback: updateGithubAction
    }
]

export default create_route_from_routes(routes)