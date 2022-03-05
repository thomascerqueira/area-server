import express from 'express';
import {create_route_from_routes, checkValidator} from '../../Functions/createroutefromroutes.js'
import {checkSchema} from "express-validator";
import {checkToken} from "../../Functions/checkArg/checkToken.js";
import {authorize} from "../../Middleware/Oauth/Oauth.js";

const routes = [
  {
    type: 'get',
    route: '/authorize',
    middlewares: [],
    callback: authorize
  }
]

export default create_route_from_routes(routes)
