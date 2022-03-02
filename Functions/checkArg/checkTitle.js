const checkTitle = {
  in: ['body'],
  isEmpty: {
    negated: true,
    errorMessage: "Title is missing",
    bail: true
  }
}

export {
  checkTitle
}
