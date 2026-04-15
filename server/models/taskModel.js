const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    label: { type: String, required: true },
    done: { type: Boolean, default: false }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Task', taskSchema)
