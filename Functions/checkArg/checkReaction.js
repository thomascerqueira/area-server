const checkReaction = {
  in: ['body'],
  isEmpty: {
    negated: true,
    errorMessage: "action is missing",
    bail: true
  },
  custom: {
    options: (value) => {
      return value.service && value.actionName && value.data && value.title
    },
    errorMessage: "action need .service .actionName .data .title"
  },
}

export {
  checkReaction
}