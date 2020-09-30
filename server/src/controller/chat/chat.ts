import express from 'express'
import Message from '../../entities/Message'
import User from '../../entities/User'

const router = express.Router()

router.get('/loadmessages', async (req, res) => {
  const { query } = req;
  var uuid: string = query.uuid as string;

  const user = await User.findOne({where: {uuid: uuid}})
  if (!user) {
    res.send({"response": "User not found"})
  }
  if (uuid == "default") {
    uuid = process.env.DEFAULTUUID
  }
  if (uuid == process.env.DEFAULTUUID) {
    res.send({"response": "User not logged in"}) 
  }

  const messages = await Message.find({})

  res.send({"response": "success", "messages": messages})
})

router.get('/allmessages', async (req, res) => {
  const { query } = req;
  const uuid: string = query.uuid as string;

  if (uuid != process.env.ADMINUUID) {
    res.send({"response": "Admin access required"})
  }

  const messages = await Message.find({})
  res.send({"response": "success", "messages": messages})
})

router.get('/sendmessage', async (req, res) => {
  const { query } = req;
  const text: string = query.text as string;
  const sender: string = query.sender as string;
  var uuid: string = query.uuid as string;

  const user = await User.findOne({where: {uuid: uuid}})
  if (!user) {
    res.send({"response": "User not found"})
  }
  if (uuid == "default") {
    uuid = process.env.DEFAULTUUID
  }
  if (uuid == process.env.DEFAULTUUID) {
    res.send({"response": "User not logged in"}) 
  }

  const message = await Message.create({
    text,
    sender,
    userUUID: uuid
  }).save()
  console.log(`${sender}: ${text}`)
  res.send({"response": "sucess", "Message": message})
})

module.exports = router