// import { trace } from '../utils.js';
import chalk from 'chalk';

export default ({ loadNotes }) => () => {
  console.log(chalk.inverse('Listing all notes:'))
  const notes = loadNotes()
  notes.forEach((note) => {
    console.log(note.title)
  });
}
