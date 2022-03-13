import chalk from 'chalk';

export default ({ loadNotes }) => ({ title }) => {
  const foundNote = loadNotes().find((note) => note.title === title)
  if (foundNote) {
    console.log(chalk.inverse(title))
    console.log(foundNote.body)
  } else {
    console.log(chalk.red.inverse('Note not found'))
  }
}
