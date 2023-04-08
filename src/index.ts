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
import { verifyJWT } from "./utils/auth";

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
        const { authorization } = req.headers;
        if (authorization) {
          const bearer = authorization.split(" ")[1];
          if (bearer) {
            const userObject = verifyJWT(bearer);
            const user = await db.user.findUnique({
              where: {
                id_deleted: {
                  id: userObject.id,
                  deleted: false,
                },
              },
            });
            return { db, user };
          }
        }
        return { db };
      },
    })
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: config.port }, resolve));

  console.log(`GraphQL Server ready at http://localhost:${config.port}/graphql`);
})();
