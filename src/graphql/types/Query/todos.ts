import { QueryResolvers, Todo_Status } from "../../resolvers-types.generated";
import { GraphQlContext } from "../../resolvers/resolvers";

const todos: QueryResolvers<GraphQlContext>["todos"] = async (_, __, { user, todoLoader }) => {
  const todos = await todoLoader.getTodosByUserId(user.id);

  return todos.map((todo) => ({
    id: todo.id,
    name: todo.name,
    status: todo.status as Todo_Status,
    userId: todo.userId,
  }));
};

export default todos;
