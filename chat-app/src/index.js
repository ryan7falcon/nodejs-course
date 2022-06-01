import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express()

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public')
const port = process.env.PORT

app.use(express.json())
app.use(express.static(publicDir))

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
