import express, {Response} from 'express'

const main = () => {
  const app = express()
  var users = [{
    username: "test",
    password: "test"
  }]
  var messages:Object[] = []

  app.get("/", (_, res: Response) => {
    res.send("Hello world")
  })
  app.get("/allusers", (_,res: Response) => {
    res.send(users)
  })

  app.get("/loadmessages", (_, res: Response) => {
    res.send(messages)
  })

  app.get("/sendmessage", (req, res:Response) => {
    const message = req.body.message;
    messages.push(message)
    res.send(messages)
  })

  app.get("/login", (req, res:Response) => {
    const username = req.query.username;
    const password = req.query.password;
    users.forEach(user => {
      if (username == user.username) {
        if (password == user.password) {
          res.send("success")
        } else {
          res.send("Incorrect username/password");
        }
      } else {
        res.send("Incorrect username/password");
      }
    })
  })

  app.listen(process.env.PORT || 5000, () => {
    console.log("Server started")
  })
}

main()