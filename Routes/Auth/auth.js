import {createUser, deleteUser, signUser, signUserProvider} from '../../Middleware/Auth/auth.js'
import {
  create_route_from_routes,
  checkValidator,
  check_arg,
  check_header
} from '../../Functions/createroutefromroutes.js'
import {checkSchema} from 'express-validator'
import {checkToken} from "../../Functions/checkArg/checkToken.js";
import {checkUser} from "../../Functions/checkArg/checkUser.js";
import {checkEmail} from "../../Functions/checkArg/checkEmail.js";
import {checkPassword} from "../../Functions/checkArg/checkPassword.js";
import {checkUsername} from "../../Functions/checkArg/checkUsername.js";
import { getTwitchAccessToken } from '../../Middleware/Auth/twitch.js'
import { getGithubAccessToken } from '../../Middleware/Auth/github.js'
import { getBattleNetAccessToken } from '../../Middleware/Auth/battlenet.js'
import { getSpotifyAccessToken } from '../../Middleware/Auth/spotify.js'
import { getRedditAccessToken } from '../../Middleware/Auth/reddit.js'

const routes = [
  {
    type: 'post',
    route: '/createUser',
    middlewares: [checkSchema({
      email: checkEmail,
      password: checkPassword,
      username: checkUsername
    }), checkValidator()],
    callback: createUser
  },
  {
    type: 'delete',
    route: '/deleteUser',
    middlewares: [checkSchema({
      tokenid: checkToken
    }), checkValidator()],
    callback: deleteUser
  },
  {
    type: 'post',
    route: '/signUser',
    middlewares: [checkSchema({
      tokenid: checkToken
    }), checkValidator()],
    callback: signUser
  },
  {
    type: 'post',
    route: '/signUserProvider',
    middlewares: [checkSchema({
      tokenid: checkToken,
      user: checkUser
    }), checkValidator()],
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
	},
	{
		type: "post",
		route: "/getBattleNetAccessToken",
		middlewares: [check_header(['tokenid']), check_arg(['code'])],
		callback: getBattleNetAccessToken
	},
	{
		type: "post",
		route: "/getSpotifyAccessToken",
		middlewares: [check_header(['tokenid']), check_arg(['code'])],
		callback: getSpotifyAccessToken
	},
	{
		type: "post",
		route: "/getRedditAccessToken",
		middlewares: [check_header(['tokenid']), check_arg(['code'])],
		callback: getRedditAccessToken
	}
]

export default create_route_from_routes(routes)
