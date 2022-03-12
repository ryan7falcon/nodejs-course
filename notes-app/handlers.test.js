import { jest } from '@jest/globals';
import {
  addNote, listNotes, readNote, removeNote,
} from './handlers.js';

describe('Handlers', () => {
  it('logs title and body on add', () => {
    const logSpy = jest.spyOn(console, 'log')
    addNote({ title: 'Shopping List', body: 'Hello!' })
    expect(logSpy).toHaveBeenCalledWith('---Adding Note---')
    expect(logSpy).toHaveBeenCalledWith('Title: Shopping List')
    expect(logSpy).toHaveBeenCalledWith('Body: Hello!')
  })

  it('logs title on remove', () => {
    const logSpy = jest.spyOn(console, 'log')
    removeNote('Shopping List')
    expect(logSpy).toHaveBeenCalledWith('removing Shopping List')
  })

  it('logs listing on list', () => {
    const logSpy = jest.spyOn(console, 'log')
    listNotes()
    expect(logSpy).toHaveBeenCalledWith('Listing all notes')
  })

  it('logs title on read', () => {
    const logSpy = jest.spyOn(console, 'log')
    readNote('Shopping List')
    expect(logSpy).toHaveBeenCalledWith('reading Shopping List')
  })
})
