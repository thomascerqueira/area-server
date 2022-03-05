import express from 'express';
import {
  create_route_from_routes,
  check_arg,
  checkValidator
} from '../../Functions/createroutefromroutes.js'
import {
  createActionReaction,
  getSurveyAction,
  updateAllSurveyAction,
  updateSurveyAction
} from "../../Middleware/Actions/Global.js";
import {testCovid} from "../../Middleware/Actions/Covid.js";
import {deleteActionReaction, deleteForced} from "../../Middleware/Actions/Delete.js";
import {checkSchema} from "express-validator";
import {checkToken} from "../../Functions/checkArg/checkToken.js";
import {checkId} from "../../Functions/checkArg/checkId.js";
import {checkAction} from "../../Functions/checkArg/checkAction.js";
import {checkReaction} from "../../Functions/checkArg/checkReaction.js";
import {checkTitle} from "../../Functions/checkArg/checkTitle.js";

const routes = [
  {
    type: 'post',
    route: '/create',
    middlewares: [checkSchema({
      tokenid: checkToken,
      action: checkAction,
      reaction: checkReaction,
      title: checkTitle
    }), checkValidator()],
    callback: createActionReaction
  },
  {
    type: 'delete',
    route: '/',
    middlewares: [checkSchema({
      tokenid: checkToken,
      id: checkId
    }), checkValidator()],
    callback: deleteActionReaction
  },
  {
    type: 'delete',
    route: '/all',
    middlewares: [check_arg(['ids'])],
    callback: deleteForced
  },
  {
    type: 'patch',
    route: '/survey',
    middlewares: [check_arg(['id', 'value'])],
    callback: updateSurveyAction
  },
  {
    type: 'patch',
    route: '/survey/all',
    middlewares: [],
    callback: updateAllSurveyAction
  },
  {
    type: 'get',
    route: "/survey",
    middlewares: [],
    callback: getSurveyAction
  },
  {
    type: 'get',
    route: "/testCovid",
    middlewares: [check_arg(['country', 'iso'])],
    callback: testCovid
  },
]

export default create_route_from_routes(routes)
