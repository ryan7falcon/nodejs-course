import { jest } from '@jest/globals'
import main from './main.js'

describe('main', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

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
        resolve(out)
      })
    })
    expect(output).toContain('Missing required arguments: title, body')
  })

  it('demands title option for remove command', async () => {
    const parser = main({
      argv: [
        '/Users/rgalimova/.nvm/versions/node/v17.6.0/bin/node',
        '/Users/rgalimova/code/node-course/notes-app/app.js',
        'remove',
      ],
    })
    const output = await new Promise((resolve) => {
      parser.parse('remove', (err, argv, out) => {
        resolve(out)
      })
    })
    expect(output).toContain('Missing required argument: title')
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
    expect(stub).toHaveBeenCalledWith({ title: 'Shopping List' })
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

  it('demands title option for read command', async () => {
    const parser = main({
      argv: [
        '/Users/rgalimova/.nvm/versions/node/v17.6.0/bin/node',
        '/Users/rgalimova/code/node-course/notes-app/app.js',
        'read',
      ],
    })
    const output = await new Promise((resolve) => {
      parser.parse('read', (err, argv, out) => {
        resolve(out)
      })
    })
    expect(output).toContain('Missing required argument: title')
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
    expect(stub).toHaveBeenCalledWith({ title: 'Shopping List' })
  })
})
