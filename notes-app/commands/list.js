const list = (listNoteHandler) => ({
  command: 'list',
  description: 'List notes',
  builder: { },
  handler: () => {
    listNoteHandler()
    // console.log(`listing ${args.title}`)
  },
})

export default list
