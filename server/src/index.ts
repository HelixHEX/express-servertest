import express, {Response} from 'express'

const main = () => {
  const app = express()

  const users = [
    {
      name: "Test User",
      username: "randomusername"
    },
    {
      name: "Test User",
      username: "randomusername"
    },
    {
      name: "Test User",
      username: "randomusername"
    },
  ]

  app.get("/", (res: Response) => {
    res.send("Hello world")
  })
  app.get("/allusers", (_,res: Response) => {
    res.send(users)
  })

  app.listen(5000, () => {
    console.log("Server started")
  })
}

main()