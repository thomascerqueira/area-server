import express from 'express';

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

export {
    create_route_from_routes,
    check_arg
}