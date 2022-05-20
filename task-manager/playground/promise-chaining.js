import '../src/db/mongoose.js'
import Task from '../src/models/task.js'

const deleteAndcount = async (id) => {
  const task = await Task.findByIdAndDelete('628552b5114fccaa0113585f')
  console.log(task)
  const count = await Task.countDocuments({ completed: false })
  return count
}

deleteAndcount()
  .then((count) => console.log(count))
  .catch((e) => console.log(e))
