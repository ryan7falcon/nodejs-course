import { jest } from '@jest/globals';
import {
  addNote,
} from './index.js';

describe('Add Note', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs saved note on add', async () => {
    const logSpy = jest.spyOn(console, 'log')
    const loadNotes = () => []
    const saveNotes = () => {}

    addNote({ loadNotes, saveNotes })({ title: 'Shopping List', body: 'Hello!' })

    expect(logSpy).toHaveBeenCalledWith('---Adding Note---')
    expect(logSpy).toHaveBeenCalledWith('Title: Shopping List')
    expect(logSpy).toHaveBeenCalledWith('Body: Hello!')
  })

  it('saves note on add', async () => {
    const loadNotes = () => []

    const notes = await new Promise((resolve) => {
      addNote({ loadNotes, saveNotes: (n) => { resolve(n) } })({ title: 'Shopping List', body: 'Hello!' })
    });

    expect(notes).toEqual([{ title: 'Shopping List', body: 'Hello!' }])
  })

  it('returns updated notes on add', async () => {
    const loadNotes = () => []
    const saveNotes = () => {}

    const notes = addNote({ loadNotes, saveNotes })({ title: 'Shopping List', body: 'Hello!' })

    expect(notes).toEqual([{ title: 'Shopping List', body: 'Hello!' }])
  })

  it('doesn\'t add duplicates', () => {
    const logSpy = jest.spyOn(console, 'log')
    const loadNotes = () => [{ title: 'Shopping List', body: 'Hello!' }]
    const saveNotes = () => {}

    const notes = addNote({ loadNotes, saveNotes })({ title: 'Shopping List', body: 'Hello!' })

    expect(logSpy).toHaveBeenCalledWith('Note title taken: ', 'Shopping List')
    expect(notes).toEqual([{ title: 'Shopping List', body: 'Hello!' }])
  })
})
