import { QueryResolvers } from "../../resolvers-types.generated";
import { GraphQlContext } from "../../resolvers/resolvers";
import { resolveWithAuth } from "../../../utils/auth";

const user: QueryResolvers<GraphQlContext>["user"] = resolveWithAuth(async (_, __, { user }) => {
  return {
    id: user.id,
    username: user.username,
    createdAt: user.createdAt.toString(),
  };
});

export default user;
