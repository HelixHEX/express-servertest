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
require("dotenv-safe/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cron_1 = __importDefault(require("cron"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const user = require('./controller/user/user');
const message = require('./controller/chat');
const User_1 = __importDefault(require("./entities/User"));
const Message_1 = __importDefault(require("./entities/Message"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        logging: true,
        synchronize: true,
        migrations: [path_1.default.join(__dirname, './migrations/*')],
        entities: [User_1.default, Message_1.default]
    });
    const app = express_1.default();
    app.get("/", (_, res) => {
        res.send("Hello world");
    });
    app.use('/v1/user', user);
    app.use('/v1/chat', message);
    const cronJob = new cron_1.default.CronJob('0 */25 * * * *', () => {
        node_fetch_1.default('https://expressservertest.herokuapp.com/')
            .then(res => console.log(`response-ok: ${res.ok}, status: ${res.status}`))
            .catch(error => console.log(error));
    });
    cronJob.start();
    app.listen(process.env.PORT, () => {
        console.log("Server started");
    });
});
main();
//# sourceMappingURL=index.js.map