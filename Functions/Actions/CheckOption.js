function checkOption(option, main, value) {
  switch (option) {
    case 'less':
      if (main <= value) {
        return true;
      }
      break
    case 'greater':
      if (main >= value) {
        return true;
      }
      break
    case 'equal':
      if (main === value) {
        return true;
      }
      break;
    default:
      return false
  }
}

export {
  checkOption
}
