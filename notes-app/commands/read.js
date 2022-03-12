const read = (readNoteHandler) => ({
  command: 'read',
  description: 'Read a note',
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (args) => {
    readNoteHandler(args.title)
    // console.log(`reading ${args.title}`)
  },
})

export default read
