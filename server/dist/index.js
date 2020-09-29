"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const main = () => {
    const app = express_1.default();
    var users = [];
    var messages = [];
    app.get("/", (_, res) => {
        res.send("Hello world");
    });
    app.get("/allusers", (_, res) => {
        res.send(users);
    });
    app.get("/loadmessages", (_, res) => {
        res.send(messages);
    });
    app.get("/sendmessage", (req, res) => {
        const text = req.query.text;
        const sender = req.query.sender;
        const message = {
            sender: sender,
            text: text
        };
        messages.push(message);
        console.log(messages);
        res.send(messages);
    });
    app.get("/login", (req, res) => {
        const username = req.query.username;
        const password = req.query.password;
        users.forEach((user) => {
            if (username == user.username) {
                if (password == user.password) {
                    res.send({ response: "success" });
                }
                else {
                    res.send({ response: "Incorrect username/password" });
                }
            }
            else {
                res.send({ response: "Incorrect username/password" });
            }
        });
    });
    app.get("/signup", (req, res) => {
        const username = req.query.username;
        const password = req.query.password;
        var exists = false;
        users.forEach((user) => {
            if (username == user.username) {
                exists = true;
            }
        });
        if (exists) {
            res.send({ "response": "Username taken" });
        }
        else {
            users.push({
                username: username,
                password: password
            });
            res.send({ "response": "success" });
        }
    });
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server started");
    });
};
main();
//# sourceMappingURL=index.js.map