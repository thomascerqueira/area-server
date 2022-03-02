const checkId = {
  id: {
    in: ['body'],
    isEmpty:  {
      negated: true,
      errorMessage: "id is missing",
      bail: true
    }
  }
}

export {
  checkId
}
