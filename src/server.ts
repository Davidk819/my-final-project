import { ApolloServer } from '@apollo/server';
import { createServer } from 'http';
import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import {resolvers} from './graphql/resolvers';
import {typeDefs} from './graphql/types';
import dotenv from "dotenv";
// import { corsOrigin as cors } from "./cors/cors";
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { Authentication } from './configoration';
import { connectPostGres } from './configoratin/postgresQL';


dotenv.config();
const port = process.env.PORT; 



const schema = makeExecutableSchema({ typeDefs, resolvers });


const app = express();
app.use(express.json());
app.use(cors<cors.CorsRequest>());
app.use(Authentication)

const httpServer = createServer(app);

const server = new ApolloServer({
  schema,
});



async function startServer () {
  await server.start();
  await connectPostGres()
  app.use('/graphql', expressMiddleware(server));
  httpServer.listen(port, () => {
    console.log(`Server is now running on http://localhost:${port}/graphql`);
  });
  
}

startServer()