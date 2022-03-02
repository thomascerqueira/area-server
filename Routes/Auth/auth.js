import {createUser, deleteUser, signUser, signUserProvider} from '../../Middleware/Auth/auth.js'
import {
  create_route_from_routes,
  checkValidator
} from '../../Functions/createroutefromroutes.js'
import {checkSchema} from 'express-validator'
import {checkToken} from "../../Functions/checkArg/checkToken.js";
import {checkUser} from "../../Functions/checkArg/checkUser.js";
import {checkEmail} from "../../Functions/checkArg/checkEmail.js";
import {checkPassword} from "../../Functions/checkArg/checkPassword.js";
import {checkUsername} from "../../Functions/checkArg/checkUsername.js";

const routes = [
  {
    type: 'post',
    route: '/createUser',
    middlewares: [checkSchema({
      checkEmail,
      checkPassword,
      checkUsername
    }), checkValidator()],
    callback: createUser
  },
  {
    type: 'delete',
    route: '/deleteUser',
    middlewares: [checkSchema({
      checkToken
    }), checkValidator()],
    callback: deleteUser
  },
  {
    type: 'post',
    route: '/signUser',
    middlewares: [checkSchema({
      checkToken
    }), checkValidator()],
    callback: signUser
  },
  {
    type: 'post',
    route: '/signUserProvider',
    middlewares: [checkSchema({
      checkToken,
      checkUser
    }), checkValidator()],
    callback: signUserProvider
  }
]

export default create_route_from_routes(routes)
