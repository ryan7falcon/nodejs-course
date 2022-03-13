import { jest } from '@jest/globals';
import chalk from 'chalk';
import { listNotes } from './index.js';

describe('List Notes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs listing on list', () => {
    const logSpy = jest.spyOn(console, 'log')
    const loadNotes = () => [{ title: 'My List', body: 'TODOlooo' }, { title: 'Party', body: 'Now!' }]

    listNotes({ loadNotes })()

    expect(logSpy).toHaveBeenCalledWith(chalk.inverse('Listing all notes:'))
    expect(logSpy).toHaveBeenCalledWith('My List')
    expect(logSpy).toHaveBeenCalledWith('Party')
  })
})
