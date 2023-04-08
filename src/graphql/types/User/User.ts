import { UserResolvers } from "../../resolvers-types.generated";
import { GraphQlContext } from "../../resolvers/resolvers";
import todos from "./todos";

const UserResolver: UserResolvers<GraphQlContext> = {
  todos,
};

export default UserResolver;
