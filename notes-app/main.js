import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {
  add, list, read, remove,
} from './commands/index.js';

export default ({
  argv,
  addNoteHandler,
  removeNoteHandler,
  listNoteHandler,
  readNoteHandler,
}) => yargs(hideBin(argv))
  .version('1.1.0')
  .command(add(addNoteHandler))
  .command(remove(removeNoteHandler))
  .command(list(listNoteHandler))
  .command(read(readNoteHandler))
