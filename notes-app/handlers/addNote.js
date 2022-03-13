import { printDebug, trace } from '../utils.js';

export default ({ loadNotes, saveNotes }) => ({ title, body }) => {
  const notes = loadNotes()
  const duplicateNotes = notes.filter((note) => note.title === title)

  if (duplicateNotes.length === 0) {
    notes.push({
      title,
      body,
    })
    console.log('---Adding Note---')
    console.log(`Title: ${title}`)
    console.log(`Body: ${body}`)
    printDebug('notes', notes)

    saveNotes(notes)
  } else {
    trace('Note title taken: ')(title)
  }
  return notes
}
