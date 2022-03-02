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
        middlewares: [checkSchema({
            tokenid: {
                in: ['headers'] ,
                isEmpty: {
                    negated: true,
                    errorMessage: "tokenid is missing"
                },
                custom: {
                    options: (value, {req}) => {
                        let token;
                        try {
                            token = req.headers.tokenid.split(' ')[1]
                            return token[0] === "Bearer";
                        } catch (err) {
                            return false
                        }
                    },
                    errorMessage: "Bad format tokenid"
                }
            }
        }), checkValidator()],
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
                isEmpty: {
                    negated: true,
                    errorMessage: "Email is missing"
                },
                isEmail: {
                    errorMessage: "Email is wrongly formated"
                }
            },
            password: {
                in: ["body"],
                isEmpty: {
                    negated: true,
                    errorMessage: "Password is missing"
                },
                isStrongPassword: {
                    errorMessage: "Password need to be stronger"
                }
            },
            username: {
                in: ["body"],
                isEmpty: {
                    negated: true,
                    errorMessage: "Username is missing"
                },
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
            if (errors[0].find('tokenid')) {
                res.status(401).send({error: errors[0]})
            } else {
                res.status(500).send({ errors: errors[0] })
            }
            return
        }
        next()
    }
}

export default create_route_from_routes(routes)
