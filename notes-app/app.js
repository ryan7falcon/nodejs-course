import {
  addNote, listNotes,
  readNote, removeNote,
} from './handlers/index.js';
import main from './main.js';
import { loadNotes, saveNotes } from './notesCrud.js';
import { printDebug } from './utils.js';

// console.log(validator.isURL('example.com'))

printDebug('process.argv: ', process.argv)

const { argv } = main({
  argv: process.argv,
  addNoteHandler: addNote({ loadNotes, saveNotes }),
  removeNoteHandler: removeNote({ loadNotes, saveNotes }),
  listNoteHandler: listNotes({ loadNotes }),
  readNoteHandler: readNote({ loadNotes }),
})

printDebug('argv: ', argv)
