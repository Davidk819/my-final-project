import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { createServer } from "http";
import express from "express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import cors from "cors";
import { resolvers } from "./resolvers";
import {typeDefs} from "./typeDefs";
const schema = makeExecutableSchema({ typeDefs, resolvers });
const app = express();
app.use(express.json());
app.use(cors<cors.CorsRequest>());
const httpServer = createServer(app);
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});
const serverCleanup = useServer({ schema }, wsServer);
const server = new ApolloServer({
  schema,
});
async function startServer() {
  await server.start();
  app.use("/graphql", expressMiddleware(server));
  const PORT = 4000;
  // Now that our HTTP server is fully set up, we can listen to it.
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
  });
}
startServer();