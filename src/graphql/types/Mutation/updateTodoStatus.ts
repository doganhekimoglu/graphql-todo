import { MutationResolvers, Todo_Status } from "../../resolvers-types.generated";
import { GraphQlContext } from "../../resolvers/resolvers";
import { AuthenticationError } from "../../errors";
import { PRISMA_NOT_FOUND } from "../../../constants";
import { resolveWithAuth } from "../../../utils/auth";

const updateTodoStatus: MutationResolvers<GraphQlContext>["updateTodoStatus"] = resolveWithAuth(
  async (_, { input: { id, status } }, { db, user }) => {
    try {
      const todo = await db.todo.update({
        where: {
          id_userId: { id, userId: user.id },
        },
        data: {
          status,
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
  }
);

export default updateTodoStatus;
