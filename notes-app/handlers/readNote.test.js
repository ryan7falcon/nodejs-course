import { jest } from '@jest/globals';
import chalk from 'chalk';
import { readNote } from './index.js';

describe('Read Notes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs title and body on read', () => {
    const logSpy = jest.spyOn(console, 'log')
    const loadNotes = () => [{ title: 'Shopping List', body: 'Hello' }]

    readNote({ loadNotes })({ title: 'Shopping List' })

    expect(logSpy).toHaveBeenCalledWith(chalk.inverse('Shopping List'))
    expect(logSpy).toHaveBeenCalledWith('Hello')
  })

  it('prints error on read in note is not found', () => {
    const logSpy = jest.spyOn(console, 'log')
    const loadNotes = () => [{ title: 'Shopping List1', body: 'Hello' }]

    readNote({ loadNotes })({ title: 'Shopping List' })

    expect(logSpy).toHaveBeenCalledWith(chalk.red.inverse('Note not found'))
  })
})
