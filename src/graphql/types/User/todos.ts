import { Todo_Status, UserResolvers } from "../../resolvers-types.generated";
import { GraphQlContext } from "../../resolvers/resolvers";

const todos: UserResolvers<GraphQlContext>["todos"] = async (user, __, { db }) => {
  const todos = await db.todo.findMany({
    where: {
      userId: user.id,
    },
  });

  return todos.map((todo) => ({
    id: todo.id,
    name: todo.name,
    status: todo.status as Todo_Status,
  }));
};

export default todos;
