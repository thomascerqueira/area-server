const checkReaction = {
  in: ['body'],
  isEmpty: {
    negated: true,
    errorMessage: "action is missing",
    bail: true
  },
  custom: {
    options: (value) => {
      return value.service && value.reactionName && value.data
    },
    errorMessage: "action need .service .actionName .data"
  },
}

export {
  checkReaction
}