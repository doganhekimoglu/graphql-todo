import { MutationResolvers, Todo_Status } from "../../resolvers-types.generated";
import { GraphQlContext } from "../../resolvers/resolvers";

const createTodo: MutationResolvers<GraphQlContext>["createTodo"] = async (_, { name }, { db, user }) => {
  const newTodo = await db.todo.create({
    data: { name, user: { connect: { id: user.id } } },
  });

  return {
    id: newTodo.id,
    name: newTodo.name,
    status: newTodo.status as Todo_Status,
    userId: user.id,
  };
};

export default createTodo;
