import express from 'express';
import {create_route_from_routes, check_arg, check_header} from '../../Functions/createroutefromroutes.js'
import {createActionReaction, getSurveyAction, updateSurveyAction} from "../../Middleware/Actions/Global.js";
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
    middlewares: [check_arg(['id']), check_header(['tokenid'])],
    callback: deleteActionReaction
  },
  {
    type: 'patch',
    route: '/survey',
    middlewares: [check_arg(['id', 'value'])],
    callback: updateSurveyAction
  },
  {
    type: 'get',
    route: "/survey",
    middlewares: [],
    callback: getSurveyAction
  }
]

export default create_route_from_routes(routes)
