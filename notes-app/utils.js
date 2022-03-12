export const trace = (label) => (message) => {
  console.log(label, message)
  return message
}

export const printDebugBuilder = (debug) => (label, message) => {
  if (debug) {
    trace(`### ${label}`)(message)
  }
}
