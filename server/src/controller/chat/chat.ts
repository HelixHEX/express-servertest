import express from 'express'
import Message from '../../entities/Message'
import User from '../../entities/User'

const router = express.Router()

router.get('/loadmessages', async (req, res) => {
  const { query } = req;
  const uuid: string = query.uuid as string;

  const user = await User.findOne({where: {uuid: uuid}})
  if (!user) {
    res.send({"response": "User not found"})
  }
  if (uuid == "bc261a38-caea-41da-987e-def6d11f0e61") {
    res.send({"response": "User not logged in"}) 
  }

  const messages = await Message.find({})
  console.log(messages)

  res.send({"response": "success", "messages": messages})
})

router.get('/sendmessage', async (req, res) => {
  const { query } = req;
  const text: string = query.text as string;
  const sender: string = query.sender as string;
  const uuid: string = query.uuid as string;

  const user = await User.findOne({where: {uuid: uuid}})
  if (!user) {
    res.send({"response": "User not found"})
  }
  if (uuid == "bc261a38-caea-41da-987e-def6d11f0e61") {
    res.send({"response": "User not logged in"}) 
  }

  const message = await Message.create({
    text,
    sender,
    userUUID: uuid
  }).save()

  res.send({"Response": "sucess", "Message": message})
})

module.exports = router