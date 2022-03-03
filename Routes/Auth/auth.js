import { createUser, deleteUser, signUser, signUserProvider } from '../../Middleware/Auth/auth.js'
import { create_route_from_routes, check_arg, check_header } from '../../Functions/createroutefromroutes.js'
import httpRequest from '../../Functions/httpRequest.js'

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
    try {
        let result = await httpRequest(
            `https://github.com/login/oauth/access_token?client_id=b8b149a225608f23c2b6&client_secret=d91aafb434103b6f5c400e5294fb4292900acecd&code=${req.body.code}&redirect_url=http://localhost:3000/services`,
            "post"
        )
        res.status(200).send(result)
    } catch (err) {
        res.status(401).send(err)
        return
    }
}

export default create_route_from_routes(routes)
