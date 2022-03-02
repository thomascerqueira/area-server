const checkUser = {
  user: {
    in: ['body'],
    isEmpty:  {
      negated: true,
      errorMessage: "username is missing",
      bail: true
    }
  }
}

export {
  checkUser
}
