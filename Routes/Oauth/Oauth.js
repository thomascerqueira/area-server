import express from 'express';
import {create_route_from_routes, checkValidator} from '../../Functions/createroutefromroutes.js'
import {checkSchema} from "express-validator";
import {checkToken} from "../../Functions/checkArg/checkToken.js";
import {getPage} from "../../Middleware/Oauth/Oauth.js";

const routes = [
  {
    type: 'GET',
    route: '/page/:redirect_url',
    middleware: [checkSchema({
      tokenid: checkToken
    }), checkValidator()],
    callback: getPage
  }
]

export default create_route_from_routes(routes)
