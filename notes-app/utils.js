export const trace = (label) => (message) => {
  console.log(label, message)
  return message
}

const printDebugBuilder = (debug) => (label, message) => {
  if (debug) {
    trace(`### ${label}`)(message)
  }
}

export const DEBUG = true
export const printDebug = printDebugBuilder(DEBUG)
