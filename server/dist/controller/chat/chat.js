"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Message_1 = __importDefault(require("../../entities/Message"));
const User_1 = __importDefault(require("../../entities/User"));
const router = express_1.default.Router();
router.get('/loadmessages', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    var uuid = query.uuid;
    const user = yield User_1.default.findOne({ where: { uuid: uuid } });
    if (!user) {
        res.send({ "response": "User not found" });
    }
    if (uuid == "default") {
        uuid = process.env.DEFAULTUUID;
    }
    if (uuid == process.env.DEFAULTUUID) {
        res.send({ "response": "User not logged in" });
    }
    const messages = yield Message_1.default.find({});
    res.send({ "response": "success", "messages": messages });
}));
router.get('/allmessages', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    const uuid = query.uuid;
    if (uuid != process.env.ADMINUUID) {
        res.send({ "response": "Admin access required" });
    }
    const messages = yield Message_1.default.find({});
    res.send({ "response": "success", "messages": messages });
}));
router.get('/sendmessage', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    const text = query.text;
    const sender = query.sender;
    var uuid = query.uuid;
    const user = yield User_1.default.findOne({ where: { uuid: uuid } });
    if (!user) {
        res.send({ "response": "User not found" });
    }
    if (uuid == "default") {
        uuid = process.env.DEFAULTUUID;
    }
    if (uuid == process.env.DEFAULTUUID) {
        res.send({ "response": "User not logged in" });
    }
    const message = yield Message_1.default.create({
        text,
        sender,
        userUUID: uuid
    }).save();
    if (uuid != process.env.ADMINUUID) {
        yield Message_1.default.create({
            text: "Automated Message: Welcome to my chat application, thanks for trying out it out.",
            sender: "admin",
            userUUID: process.env.ADMINUUID
        }).save();
        yield Message_1.default.create({
            text: "Automated Message: For bug reports, DM on on instagram @dandeproductions",
            sender: "admin",
            userUUID: process.env.ADMINUUID
        }).save();
    }
    console.log(`${sender}: ${text}`);
    res.send({ "response": "sucess", "Message": message });
}));
module.exports = router;
//# sourceMappingURL=chat.js.map