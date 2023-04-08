import { QueryResolvers, Todo_Status } from "../../resolvers-types.generated";
import { GraphQlContext } from "../../resolvers/resolvers";
import { resolveWithAuth } from "../../../utils/auth";

const todos: QueryResolvers<GraphQlContext>["todos"] = resolveWithAuth(async (_, __, { db, user }) => {
  const todos = await db.todo.findMany({
    where: {
      userId: user.id,
    },
  });

  return todos.map((todo) => ({
    id: todo.id,
    name: todo.name,
    status: todo.status as Todo_Status,
    userId: user.id,
  }));
});

export default todos;
