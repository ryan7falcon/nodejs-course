// const add = require('./utils')

// const sum = add(4, -2)
// console.log(sum)
import chalk from 'chalk';
import validator from 'validator';
import { getNotes } from './notes.js';


const notes = getNotes()
console.log(notes)

console.log(validator.isURL('example.com'))
console.log(chalk.blue.bold.inverse('Success!'))