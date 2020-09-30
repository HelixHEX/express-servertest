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
const argon2_1 = __importDefault(require("argon2"));
const User_1 = __importDefault(require("../../entities/User"));
const router = express_1.default.Router();
router.get('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    const username = query.username;
    const password = query.password;
    const hashPw = yield argon2_1.default.hash(password);
    try {
        const user = yield User_1.default.create({
            username,
            password: hashPw
        }).save();
        res.send({ "response": "success", "uuid": user.uuid });
        console.log(`${user.username} just joined`);
    }
    catch (err) {
        res.send({ "response": "An error has occurred" });
    }
}));
router.get('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    const username = query.username;
    const password = query.password;
    const user = yield User_1.default.findOne({ where: { username }, select: ['username', 'password'] });
    if (!user) {
        res.send({ resposne: "Incorrect Username/Password" });
    }
    const verify = yield argon2_1.default.verify(user.password, password);
    if (!verify) {
        res.send({ "response": "Incorrect Username/Password" });
    }
    res.send({ "response": "success", "uuid": user.uuid });
}));
module.exports = router;
//# sourceMappingURL=user.js.map