import { createUser, deleteUser, signUser, signUserProvider } from '../../Middleware/Auth/auth.js'
import {create_route_from_routes, check_arg, check_header} from '../../Functions/createroutefromroutes.js'

const routes = [
    {
        type: 'post',
        route: '/createUser',
        middlewares: [check_arg(['email', 'password', 'username'])],
        callback: createUser
    },
    {
        type: 'delete',
        route: '/deleteUser',
        middlewares: [check_header(['tokenID'])],
        callback: deleteUser
    },
    {
        type: 'post',
        route: '/signUser',
        middlewares: [check_header(['tokenID'])],
        callback: signUser
    },
    {
        type: 'post',
        route: '/signUserProvider',
        middlewares: [check_arg(['user']), check_header(['tokenID'])],
        callback: signUserProvider
    }
]



export default create_route_from_routes(routes)
