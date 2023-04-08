import { MutationResolvers, Todo_Status } from "../resolvers-types.generated";
import { GraphQlContext } from "../resolvers/resolvers";
import { AuthenticationError } from "../errors";
import { PRISMA_NOT_FOUND } from "../../constants";

const deleteTodo: MutationResolvers<GraphQlContext>["deleteTodo"] = async (_, { id }, { db, user }) => {
  try {
    const todo = await db.todo.delete({
      where: {
        id_userId: {
          id,
          userId: user.id,
        },
      },
    });

    return {
      id: todo.id,
      name: todo.name,
      status: todo.status as Todo_Status,
    };
  } catch (e: any) {
    if (e.code === PRISMA_NOT_FOUND) {
      throw new AuthenticationError();
    }
    throw e;
  }
};

export default deleteTodo;
