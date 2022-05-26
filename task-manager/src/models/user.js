import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be positive')
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.length < 6 || value.toLowerCase().includes('password')) {
        throw new Error('Weak password')
      }
    },
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    },
  }],
})

// works on the instance of user
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'thisismystuff')
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

// works on the whole model
userSchema.statics.findByCredentials = async (email, password) => {
  console.log(email)
  console.log(password)
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Unable to login')
  }

  return user
}

userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model('User', userSchema)

export default User
