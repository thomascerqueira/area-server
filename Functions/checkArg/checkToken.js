const checkToken = {
  in: ['headers'],
  isEmpty: {
    negated: true,
    errorMessage: "tokenid is missing",
    bail: true
  },
  custom: {
    options: (value, {}) => {
      try {
        const token = value.split(' ')
        return token[0] === "Bearer";
      } catch (err) {
        return false
      }
    },
    errorMessage: "Bad format tokenid",
    bail: true
  }
}

export {
  checkToken
}
