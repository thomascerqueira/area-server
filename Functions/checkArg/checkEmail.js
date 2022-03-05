const checkEmail = {
  in: ['body'],
  isEmpty: {
    negated: true,
    errorMessage: "Email is missing",
    bail: true
  },
  isEmail: {
    errorMessage: "Email is wrongly formatted",
    bail: true
  }
}

export {
  checkEmail
}
