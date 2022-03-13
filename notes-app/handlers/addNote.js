import chalk from 'chalk';
import { printDebug, trace } from '../utils.js';

export default ({ loadNotes, saveNotes }) => ({ title, body }) => {
  const notes = loadNotes()
  const duplicateNote = notes.find((note) => note.title === title)

  if (!duplicateNote) {
    notes.push({
      title,
      body,
    })
    console.log(chalk.green.inverse('---Adding Note---'))
    console.log(`Title: ${title}`)
    console.log(`Body: ${body}`)
    printDebug('notes', notes)

    saveNotes(notes)
  } else {
    trace(chalk.red.inverse('Note title taken: '))(title)
  }
  return notes
}
