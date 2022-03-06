const checkAction = {
  in: ['body'],
  isEmpty: {
    negated: true,
    errorMessage: "action is missing",
    bail: true
  },
  custom: {
    options: (value) => {
      if(!value.service || !value.actionName || !value.data)
        return false
      if (value.service === "None" || value.actionName === "None") {
        return false
      }
    },
    errorMessage: "action need .service .actionName .data"
  },
}

export {
  checkAction
}
