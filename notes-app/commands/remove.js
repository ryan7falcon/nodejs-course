const remove = (removeNoteHandler) => ({
  command: 'remove',
  description: 'Remove a note',
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (args) => {
    removeNoteHandler({ title: args.title })
    // console.log(`removeing ${args.title}`)
  },
})

export default remove
