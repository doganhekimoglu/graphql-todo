**Fully typed todo backend example with Typescript, GraphQl, Apollo Server, Postgres, Prisma Client and JWT based authentication**.

- For local development change .env.example to .env and fill environment variables.

- To install all the dependencies run the command `npm install`.

- To initialize database with the prisma schema run the command `npx prisma db push`. This will also generate Prisma Client that is in sync with the prisma schema.

- To generate GraphQl type definitions from the `schema.graphql` file run the command `npm run codegen`.

- GraphQl Playground: https://graphql-todo.up.railway.app/graphql.

- You can easily sign up using the signup mutation and receive a jwt token.

- To do create, delete, update mutations and user, todos queries do no forget to add the JWT token to `Authorization` header as Bearer since those fields need authentication.

![image](https://user-images.githubusercontent.com/39832865/230725672-1522a330-eef3-493c-850a-9a1198ad48a7.png)

