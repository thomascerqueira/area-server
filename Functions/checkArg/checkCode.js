const checkCode = {
  in: ['body'],
  isEmpty: {
    negated: true,
    errorMessage: "code is missing",
    bail: true
  }
}

export {
  checkCode
}
