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
const server_1 = require("@apollo/server");
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const schema_1 = require("@graphql-tools/schema");
const resolvers_1 = require("./graphql/resolvers");
const types_1 = require("./graphql/types");
const dotenv_1 = __importDefault(require("dotenv"));
// import { corsOrigin as cors } from "./cors/cors";
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const configoration_1 = require("./configoration");
const postgresQL_1 = require("./configoratin/postgresQL");
dotenv_1.default.config();
const port = process.env.PORT;
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: types_1.typeDefs, resolvers: resolvers_1.resolvers });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(configoration_1.Authentication);
const httpServer = (0, http_1.createServer)(app);
const server = new server_1.ApolloServer({
    schema,
});
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield server.start();
        yield (0, postgresQL_1.connectPostGres)();
        app.use('/graphql', (0, express4_1.expressMiddleware)(server));
        httpServer.listen(port, () => {
            console.log(`Server is now running on http://localhost:${port}/graphql`);
        });
    });
}
startServer();
