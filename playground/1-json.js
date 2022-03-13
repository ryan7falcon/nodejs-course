import fs from 'fs'

const data = JSON.parse(fs.readFileSync('1-json.json'))
data.name = 'Ryan'
data.age = 30
fs.writeFileSync('1-json.json', JSON.stringify(data))
