const checkUsername = {
  username: {
    in: ['body'],
    isEmpty:  {
      negated: true,
      errorMessage: "username is missing",
      bail: true
    }
  }
}

export {
  checkUsername
}
