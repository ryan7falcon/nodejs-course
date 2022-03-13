import {
  addNote, listNotes,
  readNote, removeNote,
} from './handlers/index.js';
import main from './main.js';
import { loadNotes, saveNotes } from './notesCrud.js';
import { printDebug } from './utils.js';

// const notes = getNotes()
// console.log(notes)
// console.log(validator.isURL('example.com'))
// console.log(chalk.blue.bold.inverse('Success!'))

printDebug('process.argv: ', process.argv)

const { argv } = main({
  argv: process.argv,
  addNoteHandler: addNote({ loadNotes, saveNotes }),
  removeNoteHandler: removeNote({ loadNotes, saveNotes }),
  listNoteHandler: listNotes,
  readNoteHandler: readNote,
})

printDebug('argv: ', argv)
