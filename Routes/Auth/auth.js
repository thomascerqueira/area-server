import { createUser, deleteUser, signUser, signUserProvider } from '../../Middleware/Auth/auth.js'
import { create_route_from_routes, check_arg, check_header } from '../../Functions/createroutefromroutes.js'

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
        middlewares: [check_header(['tokenid'])],
        callback: deleteUser
    },
    {
        type: 'post',
        route: '/signUser',
        middlewares: [check_header(['tokenid'])],
        callback: signUser
    },
    {
        type: 'post',
        route: '/signUserProvider',
        middlewares: [check_header(['tokenid']), check_arg(['user'])],
        callback: signUserProvider
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
    }).then(response => res.status(200).send(response))
}

export default create_route_from_routes(routes)
