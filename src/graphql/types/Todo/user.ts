import { TodoResolvers } from "../../resolvers-types.generated";
import { GraphQlContext } from "../../resolvers/resolvers";

const user: TodoResolvers<GraphQlContext>["user"] = async (todo, __, { db }) => {
  const user = await db.user.findUnique({
    where: {
      id_deleted: {
        id: todo.userId,
        deleted: false,
      },
    },
  });

  return {
    id: user.id,
    username: user.username,
    createdAt: user.createdAt.toString(),
  };
};

export default user;
