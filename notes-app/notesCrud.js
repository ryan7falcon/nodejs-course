import fs from 'fs'

const filename = 'notes.json'

export const loadNotes = () => {
  try {
    return JSON.parse(fs.readFileSync(filename).toString())
  } catch (e) {
    return []
  }
}

export const saveNotes = (notes) => {
  fs.writeFileSync(filename, JSON.stringify(notes))
  return notes
}
