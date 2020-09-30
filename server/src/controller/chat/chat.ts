import express from 'express'
import Message from '../..//entities/Message'

const router = express.Router()

router.get('/loadmessages', async (req, res) => {
  const messages = await Message.find({})

  res.send({"response": messages})
})

module.exports = router