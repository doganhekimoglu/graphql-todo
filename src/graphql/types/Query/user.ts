import { QueryResolvers } from "../../resolvers-types.generated";
import { GraphQlContext } from "../../resolvers/resolvers";

const user: QueryResolvers<GraphQlContext>["user"] = async (_, __, { user }) => {
  return {
    id: user.id,
    username: user.username,
    createdAt: user.createdAt.toString(),
  };
};

export default user;
