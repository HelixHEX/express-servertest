"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const main = () => {
    const app = express_1.default();
    var users = [{
            username: "test",
            password: "test"
        }];
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
        const message = req.body.message;
        messages.push(message);
        res.send(messages);
    });
    app.get("/login", (req, res) => {
        const username = req.query.username;
        const password = req.query.password;
        users.forEach(user => {
            if (username == user.username) {
                if (password == user.password) {
                    res.send({ "response": "Incorrect username/password" });
                }
                else {
                    res.send({ "response": "Incorrect username/password" });
                }
            }
            else {
                res.send({ "response": "Incorrect username/password" });
            }
        });
    });
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server started");
    });
};
main();
//# sourceMappingURL=index.js.map