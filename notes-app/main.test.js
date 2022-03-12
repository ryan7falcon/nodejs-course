import { jest } from '@jest/globals';
import main from './main.js';

describe('main', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('receives add command', () => {
    const stub = jest.fn()
    main({
      argv: [
        '/Users/rgalimova/.nvm/versions/node/v17.6.0/bin/node',
        '/Users/rgalimova/code/node-course/notes-app/app.js',
        'add',
        '--title="Shopping List"',
        '--body="Hello!"',
      ],
      addNoteHandler: stub,
    }).parse()
    expect(stub).toHaveBeenCalledWith({ title: 'Shopping List', body: 'Hello!' })
  })

  it('demands title and body option for add command', async () => {
    const parser = main({
      argv: [
        '/Users/rgalimova/.nvm/versions/node/v17.6.0/bin/node',
        '/Users/rgalimova/code/node-course/notes-app/app.js',
        'add',
      ],
    })
    const output = await new Promise((resolve) => {
      parser.parse('add', (err, argv, out) => {
        resolve(out);
      })
    });
    expect(output).toContain('Missing required arguments: title, body');
  })

  it('demands body option for add command', async () => {
    const parser = main({
      argv: [
        '/Users/rgalimova/.nvm/versions/node/v17.6.0/bin/node',
        '/Users/rgalimova/code/node-course/notes-app/app.js',
        'add',
      ],
    })
    const output = await new Promise((resolve) => {
      parser.parse('add --title=Bro', (err, argv, out) => {
        resolve(out);
      })
    });
    expect(output).toContain('Missing required argument: body');
  })

  it('receives remove command', () => {
    const stub = jest.fn()
    main({
      argv: [
        '/Users/rgalimova/.nvm/versions/node/v17.6.0/bin/node',
        '/Users/rgalimova/code/node-course/notes-app/app.js',
        'remove',
        '--title="Shopping List"',
      ],
      removeNoteHandler: stub,
    }).parse()
    expect(stub).toHaveBeenCalledWith('Shopping List')
  })

  it('receives list command', () => {
    const stub = jest.fn()
    main({
      argv: [
        '/Users/rgalimova/.nvm/versions/node/v17.6.0/bin/node',
        '/Users/rgalimova/code/node-course/notes-app/app.js',
        'list',
      ],
      listNoteHandler: stub,
    }).parse()
    expect(stub).toHaveBeenCalled()
  })

  it('receives read command', () => {
    const stub = jest.fn()
    main({
      argv: [
        '/Users/rgalimova/.nvm/versions/node/v17.6.0/bin/node',
        '/Users/rgalimova/code/node-course/notes-app/app.js',
        'read',
        '--title="Shopping List"',
      ],
      readNoteHandler: stub,
    }).parse()
    expect(stub).toHaveBeenCalledWith('Shopping List')
  })
})
