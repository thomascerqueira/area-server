const checkAction = {
  in: ['body'],
  isEmpty: {
    negated: true,
    errorMessage: "action is missing",
    bail: true
  },
  custom: {
    options: (value) => {
      return value.service && value.actionName && value.data
    },
    errorMessage: "action need .service .actionName .data"
  },
}

export {
  checkAction
}
