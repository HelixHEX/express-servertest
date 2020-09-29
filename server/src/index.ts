import express, { Response } from "express";

const main = () => {
  const app = express();
  var users: Array<any> = [
    {
      username: "test",
      password: "test",
    },
  ];
  var messages: Array<any> = [
    {
      sender: "test",
      text: "Hiiii"
    },
    {
      sender: "test",
      text: "Hiiii"
    },
    {
      sender: "admin",
      text: "Hiiii"
    },
    {
      sender: "test",
      text: "Hiiii"
    },
    
  ];

  app.get("/", (_, res: Response) => {
    res.send("Hello world");
  });
  app.get("/allusers", (_, res: Response) => {
    res.send(users);
  });

  app.get("/loadmessages", (_, res: Response) => {
    res.send(messages);
  });

  app.get("/sendmessage", (req, res: Response) => {
    const text = req.query.text;
    const sender = req.query.sender;
    const message = {
      sender: sender,
      text: text
    }
    messages.push(message);
    if (messages.length > 4) {
      messages.shift();
    }
    console.log(messages)
    res.send(messages);
  });

  app.get("/login", (req, res: Response) => {
    const username = req.query.username;
    const password = req.query.password;
    users.forEach((user) => {
      if (username == user.username) {
        if (password == user.password) {
          res.send({ response: "success" });
        } else {
          res.send({ response: "Incorrect username/password" });
        }
      } else {
        res.send({ response: "Incorrect username/password" });
      }
    });
  });

  app.get("/signup", (req, res: Response) => {
    const username = req.query.username;
    const password = req.query.password;
    var exists = false;
    users.forEach((user) => {
      if (username == user.username) {
        exists = true;
      }
    });
    if (exists) {
      res.send({"response": "Username taken"});
    } else {
      users.push({
        username: username,
        password: password
      })
      res.send({"response": "success"});
    }
  });

  app.listen(process.env.PORT || 5000, () => {
    console.log("Server started");
  });
};

main();
