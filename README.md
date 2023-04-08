**Todo backend example with Typescript, GraphQl, Postgres and Prisma Client**.

- For local development change .env.example to .env and fill environment variables.

- To install all the dependencies run the command `npm install`.

- To initialize database with the prisma schema run the command `npx prisma db push`. This will also generate Prisma Client that is in sync with the prisma schema.

- To generate GraphQl type definitions from the `schema.graphql` file run the command `npm run codegen`.

- GraphQl Playground: https://graphql-todo.up.railway.app/graphql.

- To do create, delete and update mutations do no forget to add the JWT token to `Authorization` header as Bearer.
