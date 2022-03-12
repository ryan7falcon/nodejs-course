const add = (addNoteHandler) => ({
  command: 'add',
  description: 'Add a new note',
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      string: true,
    },
    body: {
      describe: 'Note Body',
      demandOption: true,
      string: true,
    },
  },
  handler: (args) => {
    addNoteHandler({ title: args.title, body: args.body })
    // console.log(`adding ${args.title}`)
  },
})

export default add
