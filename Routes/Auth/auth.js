import { createUser, deleteUser, signUser, signUserProvider } from '../../Middleware/Auth/auth.js'
import { create_route_from_routes, check_arg, check_header } from '../../Functions/createroutefromroutes.js'
import httpRequest from '../../Functions/httpRequest.js'
import { getTwitchAccessToken } from '../../Middleware/Auth/twitch.js'
import { getGithubAccessToken } from '../../Middleware/Auth/github.js'

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
		type: "post",
		route: "/getTwitchAccessToken",
		middlewares: [check_header(['tokenid']), check_arg(['code'])],
		callback: getTwitchAccessToken
	},
	{
		type: "post",
		route: "/getGitHubAccessToken",
		middlewares: [check_header(['tokenid']), check_arg(['code'])],
		callback: getGithubAccessToken
	}
]

export default create_route_from_routes(routes)
