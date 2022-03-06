import express from 'express';
import {getAllServices} from "../Middleware/Services/services.js";
import {create_route_from_routes} from "../Functions/createroutefromroutes.js";
import {about} from "../Middleware/About.js";


const routes = [
  {
    type: 'get',
    route: '/about.json',
    middlewares: [],
    callback: about
  }
]

export default create_route_from_routes(routes)
