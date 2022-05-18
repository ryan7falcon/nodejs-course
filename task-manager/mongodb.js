import { randomFillSync } from 'crypto'
import { MongoClient, ObjectId } from 'mongodb'

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectId()
// console.log(id.id.length)
// console.log(id.toHexString().length)

MongoClient.connect(connectionURL, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database')
  }

  const db = client.db(databaseName)

  //   db.collection('users').findOne({ _id: new ObjectId('6284fb0cf2ce8c5971965afd') }, (err, user) => {
  //     if (err) {
  //       return console.log('Unable to inser user')
  //     }
  //     return console.log(user)
  //   })

  //   db.collection('users').find({ age: 27 }).toArray((err, user) => {
  //     if (err) {
  //       return console.log('Unable to inser user')
  //     }
  //     return console.log(user)
  //   })

  //   db.collection('users').countDocuments({ age: 27 }, (err, count) => {
  //     if (err) {
  //       return console.log('Unable to inser user')
  //     }
  //     return console.log(count)
  //   })

  //   db.collection('tasks').find({ completed: false }).toArray((err, task) => {
  //     if (err) {
  //       return console.log('Unable to find task')
  //     }
  //     return console.log(task)
  //   })

  //   db.collection('tasks').find({ _id: new ObjectId('6284fbacefe3c71cc029e3c2') }).toArray((err, task) => {
  //     if (err) {
  //       return console.log('Unable to find task')
  //     }
  //     return console.log(task)
  //   })

  // db.collection('users').updateOne({ _id: new ObjectId('6284fb0cf2ce8c5971965afc') }, {
  //   $inc: {
  //     age: 1,
  //   },
  // }).then((result) => {
  //   console.log(result)
  // }).catch((err) => {
  //   console.log(err)
  // })

  // db.collection('tasks').updateMany({ }, {
  //   $set: {
  //     completed: true,
  //   },
  // }).then((result) => {
  //   console.log(result)
  // }).catch((err) => {
  //   console.log(err)
  // })

  db.collection('tasks').deleteOne({
    description: 'Bro',
  }).then((result) => {
    console.log(result)
  }).catch((err) => {
    console.log(err)
  })

  //   db.collection('users').insertOne({ name: 'Ryan', age: 30 }, (err, result) => {
  //     if (err) {
  //       return console.log('Unable to inser user')
  //     }
  //     return console.log(result)
  //   })

  //   return console.log('connected correctly!')

//   return db.collection('tasks').insertMany([{
//     description: 'Bro',
//     completed: true,
//   }, {
//     description: 'Sue',
//     completed: false,
//   }, {
//     description: 'Buy',
//     completed: false,
//   }], (err, result) => {
//     if (err) {
//       return console.log('Unable to inser user')
//     }
//     return console.log(result)
//   })
})
