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
exports.resolvers = void 0;
const usersControlers_1 = require("../controlers/usersControlers");
const array1 = [];
exports.resolvers = {
    Query: {
        david: () => __awaiter(void 0, void 0, void 0, function* () {
            let rand = Math.floor(Math.random() * 10) + 1;
            return rand;
        }),
    },
    Mutation: {
        sinUp: (a, args) => __awaiter(void 0, void 0, void 0, function* () {
            (0, usersControlers_1.sinUpC)(args);
            const b = {
                name: args.name,
                password: args.password
            };
            return args;
        }),
    },
};
