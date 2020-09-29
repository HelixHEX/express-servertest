"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const main = () => {
    const app = express_1.default();
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
    ];
    app.get("/", (_, res) => {
        res.send("Hello world");
    });
    app.get("/allusers", (_, res) => {
        res.send(users);
    });
    app.listen(process.env.port || 5000, () => {
        console.log("Server started");
    });
};
main();
//# sourceMappingURL=index.js.map