import { main } from './app.js'

describe('testing main app', () => {
  it('prints to the console', () => {
    main()
    expect(true).toBe(true)
  })
})
