import express from 'express';
import { create_route_from_routes, check_arg, check_header } from '../../Functions/createroutefromroutes.js'
import { createActionReaction, getSurveyAction, updateSurveyAction } from "../../Middleware/Actions/Global.js";
import { testCovid } from "../../Middleware/Actions/Covid.js";
import { deleteActionReaction, deleteForced } from "../../Middleware/Actions/Delete.js";
import httpRequest from '../../Functions/httpRequest.js';

const routes = [
  {
    type: 'post',
    route: '/create',
    middlewares: [check_header(['tokenid']), check_arg(['action', 'reaction'])],
    callback: createActionReaction
  },
  {
    type: 'delete',
    route: '/',
    middlewares: [check_arg(['id']), check_header(['tokenid'])],
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
  {
    type: 'post',
    route: "/getGitHubToken",
    middlewares: [],
    callback: getGitHubToken
  }
]

async function getGitHubToken(req, res) {
  fetch("https://github.com/login/oauth/access_token", {
    method: "post",
    body: new URLSearchParams({
      client_id: "b8b149a225608f23c2b6",
      client_secret: "d91aafb434103b6f5c400e5294fb4292900acecd",
      code: req.body.code,
      redirect_uri: "http://localhost:3000/services",
    })
  }).then(response => res.send(response))
}

export default create_route_from_routes(routes)
