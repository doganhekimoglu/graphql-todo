import "dotenv/config";
import config from "./config";
import express from "express";
import { GRAPHQL_SCHEMA_PATH } from "./constants";
import { createServer } from "http";
import { ApolloServer } from "@apollo/server";
import resolvers, { GraphQlContext } from "./graphql/resolvers/resolvers";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import db from "./utils/db";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { authenticate } from "./utils/auth";
import { TodoLoader, UserLoader } from "./graphql/dataloaders";

let SCHEMA = loadSchemaSync(GRAPHQL_SCHEMA_PATH, {
  loaders: [new GraphQLFileLoader()],
});

(async () => {
  const app = express();

  const httpServer = createServer(app);

  const server = new ApolloServer<GraphQlContext>({
    schema: addResolversToSchema({
      resolvers,
      schema: SCHEMA,
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const user = await authenticate(req);
        if (user) {
          return { db, user, userLoader: new UserLoader(), todoLoader: new TodoLoader() };
        }
        return { db };
      },
    })
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: config.port }, resolve));

  console.log(`GraphQL Server ready at http://localhost:${config.port}/graphql`);
})();
