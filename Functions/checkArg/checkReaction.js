const checkReaction = {
  in: ['body'],
  isEmpty: {
    negated: true,
    errorMessage: "action is missing",
    bail: true
  },
  custom: {
    options: (value) => {
      if(!value.service || !value.reactionName || !value.data)
        return false
      if (value.service === "None" || value.reactionName === "None") {
        return false
      }
      return true
    },
    errorMessage: "action need .service .actionName .data",
    bail: true
  },
}

export {
  checkReaction
}
