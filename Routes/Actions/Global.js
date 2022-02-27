import express from 'express';
import {create_route_from_routes, check_arg, check_header} from '../../Functions/createroutefromroutes.js'
import {createActionReaction} from "../../Middleware/Actions/Global.js";
import {deleteActionReaction} from "../../Middleware/Actions/Delete.js";

const routes = [
  {
    type: 'post',
    route: '/create',
    middlewares: [check_arg(['action', 'reaction'])],
    callback: createActionReaction
  },
  {
    type: 'delete',
    route: '/',
    middlewares: [check_arg(['id']), check_header('tokenid')],
    callback: deleteActionReaction
  }
]

export default create_route_from_routes(routes)
