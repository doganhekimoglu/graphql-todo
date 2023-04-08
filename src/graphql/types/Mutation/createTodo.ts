import { MutationResolvers, Todo_Status } from "../../resolvers-types.generated";
import { GraphQlContext } from "../../resolvers/resolvers";
import { resolveWithAuth } from "../../../utils/auth";

const createTodo: MutationResolvers<GraphQlContext>["createTodo"] = resolveWithAuth(async (_, { name }, { db, user }) => {
  const newTodo = await db.todo.create({
    data: { name, user: { connect: { id: user.id } } },
  });

  return {
    id: newTodo.id,
    name: newTodo.name,
    status: newTodo.status as Todo_Status,
  };
});

export default createTodo;
