import chalk from 'chalk';
import { printDebug, trace } from '../utils.js';

export default ({ loadNotes, saveNotes }) => ({ title }) => {
  const notes = loadNotes()
  const filteredNotes = notes.filter((note) => note.title !== title)

  if (filteredNotes.length !== notes.length) {
    console.log(chalk.green.inverse('---Removing Note---'))
    console.log(`Title: ${title}`)
    console.log(`Body: ${notes.find((note) => note.title === title).body}`)
    printDebug('notes', notes)

    saveNotes(filteredNotes)
  } else {
    trace(chalk.red.inverse('Note not found: '))(title)
  }
  return filteredNotes
}
