import express from 'express';
import {create_route_from_routes, check_arg, check_header} from '../../Functions/createroutefromroutes.js'
import {createActionReaction} from "../../Middleware/Actions/Global.js";

const routes = [
  {
    type: 'post',
    route: '/create',
    middlewares: [check_arg(['action', 'reaction'])],
    callback: createActionReaction
  }
]

export default create_route_from_routes(routes)