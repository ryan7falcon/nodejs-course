import { jest } from '@jest/globals';
import chalk from 'chalk';
import { removeNote } from './index.js';

describe('Remove Note', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs title and body on remove', () => {
    const logSpy = jest.spyOn(console, 'log')
    const oldNotes = [{ title: 'Shopping List2', body: 'Hello!' }]
    const loadNotes = () => oldNotes
    const saveNotes = () => {}

    const notes = removeNote({ loadNotes, saveNotes })({ title: 'Shopping List2' })

    expect(logSpy).toHaveBeenCalledWith(chalk.green.inverse('---Removing Note---'))
    expect(logSpy).toHaveBeenCalledWith('Title: Shopping List2')
    expect(logSpy).toHaveBeenCalledWith('Body: Hello!')
    expect(notes).toEqual([])
  })

  it('saves updated notes on remove', async () => {
    const oldNotes = [{ title: 'Shopping List', body: 'Hello!' }]
    const loadNotes = () => oldNotes
    const notes = await new Promise((resolve) => {
      removeNote({ loadNotes, saveNotes: (n) => { resolve(n) } })({ title: 'Shopping List' })
    });
    expect(notes).toEqual([])
  })

  it('returns updated notes on remove', async () => {
    const oldNotes = [{ title: 'Shopping List', body: 'Hello!' }]
    const loadNotes = () => oldNotes
    const notes = removeNote({ loadNotes, saveNotes: () => {} })({ title: 'Shopping List' })
    expect(notes).toEqual([])
  })

  it('if note doesn\'t exist, remove print error', () => {
    const logSpy = jest.spyOn(console, 'log')
    const oldNotes = [{ title: 'Shopping List', body: 'Hello!' }]
    const loadNotes = () => oldNotes
    const saveNotes = () => {}
    const notes = removeNote({ loadNotes, saveNotes })({ title: 'Shopping List1' })
    expect(logSpy).toHaveBeenCalledWith(chalk.red.inverse('Note not found: '), 'Shopping List1')
    expect(notes).toEqual(oldNotes)
  })
})
