import mongoose from 'mongoose'
import validator from 'validator'

const connectionURL = process.env.MONGO_CONNECTION
const databaseName = 'task-manager-api'

mongoose.connect(`${connectionURL}/${databaseName}`)
