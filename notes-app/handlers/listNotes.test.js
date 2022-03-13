import { jest } from '@jest/globals';
import { listNotes } from './index.js';

describe('List Notes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs listing on list', () => {
    const logSpy = jest.spyOn(console, 'log')
    listNotes()
    expect(logSpy).toHaveBeenCalledWith('Listing all notes')
  })
})
