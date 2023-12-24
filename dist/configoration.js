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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const secretKey = "david";
// const token = jwt.sign("1", secretKey, { expiresIn: "30d" });
const Authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.headers.authorization;
    next();
    const token = req.headers["authorization"];
    if (!token) {
        res.status(400).send("token is required");
        return;
    }
    if (token !== "1") {
        res.status(400).send("Failed to verify token:");
    }
    else {
        next();
    }
});
exports.Authentication = Authentication;
