import { Todo_Status, UserResolvers } from "../../resolvers-types.generated";
import { GraphQlContext } from "../../resolvers/resolvers";

const todos: UserResolvers<GraphQlContext>["todos"] = async (user, __, { db: _, todoLoader }) => {
  const todos = await todoLoader.getTodosByUserId(user.id);

  return todos.map((todo) => ({
    id: todo.id,
    name: todo.name,
    status: todo.status as Todo_Status,
    userId: user.id,
  }));
};

export default todos;
