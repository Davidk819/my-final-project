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
exports.newUser = exports.connectPostGres = exports.itemsPool = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.itemsPool = new pg_1.Pool({
    connectionString: process.env.POSTGRES_CONNECTION_URI,
    ssl: { rejectUnauthorized: false },
});
const connectPostGres = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.itemsPool.connect();
        console.log("Connected to PostGres");
    }
    catch (error) {
        console.error("Error connecting to PostGres:", error);
    }
});
exports.connectPostGres = connectPostGres;
const newUser = (name, password) => __awaiter(void 0, void 0, void 0, function* () {
    const data2 = yield exports.itemsPool.query(`
INSERT INTO users (username, user_password)
 VALUES ('${name}','${password}');
`);
});
exports.newUser = newUser;
