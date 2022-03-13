import { jest } from '@jest/globals';
import { readNote } from './index.js';

describe('Read Notes', () => {
  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  it('logs title on read', () => {
    const logSpy = jest.spyOn(console, 'log')
    readNote('Shopping List')
    expect(logSpy).toHaveBeenCalledWith('reading Shopping List')
  })
})
