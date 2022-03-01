import { createUser, deleteUser, signUser, signUserProvider } from '../../Middleware/Auth/auth.js'
import { create_route_from_routes, check_arg, check_header } from '../../Functions/createroutefromroutes.js'
import { checkSchema, validationResult } from 'express-validator'

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
        route: '/test',
        middlewares: [checkSchema({
            email: {
                in: ['body'],
                errorMessage: "Email is missing",
                isEmail: true,
            },
            password: {
                in: ["body"],
                errorMessage: "Password is missing",
                isStrongPassword: true
            },
            username: {
                in: ["body"],
                errorMessage: "Username is missing",
            }
        }), checkValidator()],
        callback: callback
    }
]

async function callback(req, res, next) {
    res.status(200).send({ msg: "all is good" })
}

function checkValidator() {
    return (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(500).send({ errors: errors.array() })
            return
        }
        next()
    }
}

export default create_route_from_routes(routes)
