const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const router = express.Router()

function makeToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password needed' })
    }
    const already = await User.findOne({ email: email.toLowerCase() })
    if (already) {
      return res.status(400).json({ message: 'email taken' })
    }
    const hash = await bcrypt.hash(password, 10)
    const u = await User.create({ email: email.toLowerCase(), password: hash })
    res.status(201).json({ token: makeToken(u._id.toString()), email: u.email })
  } catch (e) {
    console.error('register err', e.message)
    if (e.code === 11000) {
      return res.status(400).json({ message: 'email taken' })
    }
    res.status(500).json({ message: 'server messed up' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password needed' })
    }
    const u = await User.findOne({ email: email.toLowerCase() })
    if (!u) {
      return res.status(400).json({ message: 'wrong email or password' })
    }
    const ok = await bcrypt.compare(password, u.password)
    if (!ok) {
      return res.status(400).json({ message: 'wrong email or password' })
    }
    res.json({ token: makeToken(u._id.toString()), email: u.email })
  } catch (e) {
    console.error('login err', e.message)
    res.status(500).json({ message: 'server messed up' })
  }
})

module.exports = router
