import express from 'express';
import {create_route_from_routes, check_arg, check_header} from '../../Functions/createroutefromroutes.js'
import {createActionReaction, deleteActionReaction, getActionReaction, updateActionReaction} from "../../Middleware/Actions/Global.js";

const routes = [
  {
    type: 'post',
    route: '/create',
    middlewares: [check_arg(['action', 'reaction'])],
    callback: createActionReaction
  },
  {
    type: 'get',
    route: '/get',
    middlewares: [],
    callback: getActionReaction
  },
  {
    type: 'patch',
    route: '/update',
    middlewares: [check_arg(['action', 'reaction'])],
    callback: updateActionReaction
  },
  {
    type: 'delete',
    route: '/delete',
    middlewares: [check_arg(['area_id'])],
    callback: deleteActionReaction
  }
]

export default create_route_from_routes(routes)