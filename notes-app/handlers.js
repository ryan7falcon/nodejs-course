// Handlers
export const addNote = ({ title, body }) => {
  console.log('---Adding Note---')
  console.log(`Title: ${title}`)
  console.log(`Body: ${body}`)
}

export const removeNote = (title) => {
  console.log(`removing ${title}`)
}

export const listNotes = () => {
  console.log('Listing all notes')
}

export const readNote = (title) => {
  console.log(`reading ${title}`)
}
