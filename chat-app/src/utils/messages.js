const generateMessage = (text) => ({
  text,
  createdAt: new Date().getTime(),
})

const generateLocationMessage = (url) => ({
  url,
  createdAt: new Date().getTime(),
})

export { generateMessage, generateLocationMessage }
