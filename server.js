import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";

import { typeDefs } from "./src/schema/typeDefs.js";
import { resolvers } from "./src/schema/resolvers.js";
import { connectDB } from "./src/db.js";

const app = express();
app.use(cors());
//app.use(bodyParser.json());

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();
server.applyMiddleware({ app, path: "/graphql" });

app.listen(4000, () =>
  console.log(" GraphQL Server running at http://localhost:4000/graphql")
);
