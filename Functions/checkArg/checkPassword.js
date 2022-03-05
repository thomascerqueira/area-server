const checkPassword = {
  in: ["body"],
  isEmpty: {
    negated: true,
    errorMessage: "Password is missing",
    bail: true
  },
  custom: {
    options: (value) => {
      return value.length >= 6
    },
    errorMessage: "Password need to be 6 length"
  }
}

export {
  checkPassword
}
