// const add = require('./utils')

// const sum = add(4, -2)
// console.log(sum)
import chalk from 'chalk';
import validator from 'validator';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { getNotes } from './notes.js';

const main = () => {
  const notes = getNotes()
  console.log(notes)
  console.log(validator.isURL('example.com'))
  console.log(chalk.blue.bold.inverse('Success!'))

  const yarg = yargs(hideBin(process.argv))
    .version('1.1.0')
    .command('add', 'Add a new note', {}, (argv) => {
      console.log('Adding a new note')
    })
    .command('remove', 'Remove a note', {}, () => {
      console.log('Removing a note')
    })
    .command('list', 'List notes', {}, () => {
      console.log('Listing a note')
    })
    .command('read', 'Read a note', {}, () => {
      console.log('Reading a note')
    })
    .parse()
  console.log(yarg)
}

main()

export { main };
