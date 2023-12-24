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
const express4_1 = require("@apollo/server/express4");
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const schema_1 = require("@graphql-tools/schema");
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
const cors_1 = __importDefault(require("cors"));
const resolvers_1 = require("./resolvers");
const typeDefs_1 = require("./typeDefs");
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: typeDefs_1.typeDefs, resolvers: resolvers_1.resolvers });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const httpServer = (0, http_1.createServer)(app);
const wsServer = new ws_1.WebSocketServer({
    server: httpServer,
    path: "/graphql",
});
const serverCleanup = (0, ws_2.useServer)({ schema }, wsServer);
const server = new server_1.ApolloServer({
    schema,
});
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield server.start();
        app.use("/graphql", (0, express4_1.expressMiddleware)(server));
        const PORT = 4000;
        // Now that our HTTP server is fully set up, we can listen to it.
        httpServer.listen(PORT, () => {
            console.log(`Server is now running on http://localhost:${PORT}/graphql`);
        });
    });
}
startServer();
