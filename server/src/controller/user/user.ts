import express from 'express'
import argon2 from 'argon2';
import User from '../../entities/User'

const router = express.Router()

router.get('/signup', async (req: express.Request, res: express.Response) => {
  const { query } = req;
  const username: string = query.username as string
  const password: string = query.password as string

  const hashPw = await argon2.hash(password);
  try {
    const user = await User.create({
      username,
      password: hashPw
    }).save();

    res.send({response: "success"})
    console.log(`${user.username} just joined`)
  } catch(err) {
    res.send({response: "An error has occurred"})
  }
})

router.get('/login', async (req: express.Request, res: express.Response) => {
  const { query } = req;
  const username: string = query.username as string
  const password: string = query.password as string 

  const user = await User.findOne({where:{username}, select: ['username', 'password']});
  if (!user) {
    res.send({resposne: "Incorrect Username/Password"})
  }
  const verify = await argon2.verify(user!.password, password)
  if (!verify) {
    res.send({response: "Incorrect Username/Password"})
  }

  res.send({response: "success"}) 
})

module.exports = router