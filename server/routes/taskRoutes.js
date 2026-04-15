const express = require('express')
const Task = require('../models/taskModel')
const protect = require('../middleware/protect')

const router = express.Router()
router.use(protect)

router.get('/', async (req, res) => {
  try {
    const myTasks = await Task.find({ owner: req.userId }).sort({ createdAt: -1 })
    res.json(myTasks)
  } catch (e) {
    res.status(500).json({ message: 'could not load tasks' })
  }
})

router.post('/', async (req, res) => {
  try {
    const label = (req.body.label || '').trim()
    if (!label) {
      return res.status(400).json({ message: 'task cant be empty' })
    }
    const t = await Task.create({ owner: req.userId, label, done: false })
    res.status(201).json(t)
  } catch (e) {
    res.status(500).json({ message: 'could not save task' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const r = await Task.findOneAndDelete({ _id: req.params.id, owner: req.userId })
    if (!r) {
      return res.status(404).json({ message: 'task not found' })
    }
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ message: 'delete failed' })
  }
})

router.patch('/:id/toggle', async (req, res) => {
  try {
    const t = await Task.findOne({ _id: req.params.id, owner: req.userId })
    if (!t) {
      return res.status(404).json({ message: 'task not found' })
    }
    t.done = !t.done
    await t.save()
    res.json(t)
  } catch (e) {
    res.status(500).json({ message: 'toggle failed' })
  }
})

module.exports = router
