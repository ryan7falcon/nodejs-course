import mongoose from 'mongoose'
import validator from 'validator'

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager-api'

mongoose.connect(`${connectionURL}/${databaseName}`)
