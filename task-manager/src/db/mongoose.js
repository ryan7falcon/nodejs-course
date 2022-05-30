import mongoose from 'mongoose'
import validator from 'validator'

const connectionURL = process.env.MONGO_CONNECTION

mongoose.connect(connectionURL)
