import express from 'express';
import {validationResult} from "express-validator";

/**
 * Create route from array of route
 * @param {array} routes routes
 * @returns {express.Router} router created
 */
const create_route_from_routes = (routes) => {
  const router = express.Router()
  for (const route of routes) {
    router[route.type](route.route, ...route.middlewares, route.callback)
  }
  return router
}

/**
 * Check if args are in the request
 * @param {array} args args to have
 */
function check_arg(args) {
  return (req, res, next) => {
    for (const arg of args) {
      if (!(arg in req.body)) {
        res.status(500).send({msg: `Missing arg '${arg}'`});
        return;
      }
    }
    next();
  }
}

/**
 * Check if headers are in the request
 * @param {array} headers header to have
 */
function check_header(headers) {
  return (req, res, next) => {
    for (const header of headers) {
      if (!(header in req.headers)) {
        res.status(500).send({msg: `Missing header '${header}'`});
        return;
      }
    }
    next()
  }
}

function checkValidator() {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (errors.array()[0].msg.indexOf("tokenid") !== -1) {
        res.status(401).send(errors)
      } else {
        res.status(500).send(errors)
      }
      return
    }
    next()
  }
}

export {
  create_route_from_routes,
  check_arg,
  check_header,
  checkValidator
}
