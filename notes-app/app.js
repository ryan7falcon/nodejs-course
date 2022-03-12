import {
  addNote, listNotes,
  readNote, removeNote,
} from './handlers.js';
import main from './main.js';
import { printDebugBuilder } from './utils.js';

// const notes = getNotes()
// console.log(notes)
// console.log(validator.isURL('example.com'))
// console.log(chalk.blue.bold.inverse('Success!'))
const DEBUG = true
const printDebug = printDebugBuilder(DEBUG)

printDebug('process.argv: ', process.argv)

const { argv } = main({
  argv: process.argv,
  addNoteHandler: addNote,
  removeNoteHandler: removeNote,
  listNoteHandler: listNotes,
  readNoteHandler: readNote,
})

printDebug('argv: ', argv)
