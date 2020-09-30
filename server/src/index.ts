import "dotenv-safe/config";
import "reflect-metadata";

import express, { Response } from "express";
import cron from 'cron'
import fetch from 'node-fetch'
import { createConnection } from "typeorm";
import path from 'path'

//controllers
const user = require('./controller/user/user');
const message = require('./controller/chat')

//Entities
import User from './entities/User'
import Message from './entities/Message'

const main = async () => {
  //setup postgres
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [User, Message]
  })

  const app = express();

  app.get("/", (_, res: Response) => {
    res.send("Hello world");
  });

  app.use('/v1/user', user)
  app.use('/v1/chat', message)
  // app.get("/allusers", (_, res: Response) => {
  //   res.send(users);
  // });

  // app.get("/loadmessages", (_, res: Response) => {
  //   res.send(messages);
  // });

  // app.get("/sendmessage", (req, res: Response) => {
  //   const text = req.query.text;
  //   const sender = req.query.sender;
  //   const message = {
  //     sender: sender,
  //     text: text
  //   }
  //   messages.push(message);
  //   console.log(messages)
  //   res.send(messages);
  // });

  // app.get("/login", (req, res: Response) => {
  //   const username = req.query.username;
  //   const password = req.query.password;
  //   if (users.length >= 1) {
  //     users.forEach(user => {
  //       if (username == user.username) {
  //         if (password == user.password) {
  //           res.send({ response: "success" });
  //         } else {
  //           res.send({ response: "Incorrect username/password" });
  //         }
  //       } else {
  //         res.send({ response: "Incorrect username/password" });
  //       }
  //     });
  //   } 
  //   res.send({ response: "No users"});
  // });

  // app.get("/signup", (req, res: Response) => {
  //   const username = req.query.username;
  //   const password = req.query.password;
  //   var exists = false;
  //   users.forEach((user) => {
  //     if (username == user.username) {
  //       exists = true;
  //     }
  //   });
  //   if (exists) {
  //     res.send({"response": "Username taken"});
  //   } else {
  //     users.push({
  //       username: username,
  //       password: password
  //     })
  //     res.send({"response": "success"});
  //   }
  // });
  const cronJob = new cron.CronJob('0 */25 * * * *', () => {
    fetch('https://expressservertest.herokuapp.com/')
      .then(res => console.log(`response-ok: ${res.ok}, status: ${res.status}`))
      .catch(error => console.log(error))
  });

  cronJob.start();

  app.listen(process.env.PORT, () => {
    console.log("Server started");
  });
};

main();
