const checkId = {
  in: ['body'],
  isEmpty: {
    negated: true,
    errorMessage: "id is missing",
    bail: true
  }
}

export {
  checkId
}
