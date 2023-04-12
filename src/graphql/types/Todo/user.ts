import { TodoResolvers } from "../../resolvers-types.generated";
import { GraphQlContext } from "../../resolvers/resolvers";

const user: TodoResolvers<GraphQlContext>["user"] = async (todo, __, { userLoader }) => {
  const user = await userLoader.getUserById(todo.userId);

  return {
    id: user.id,
    username: user.username,
    createdAt: user.createdAt.toString(),
  };
};

export default user;
