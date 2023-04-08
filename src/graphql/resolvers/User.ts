import { UserResolvers } from "../resolvers-types.generated";
import { GraphQlContext } from "./resolvers";
import todos from "../queries/todos";

const BasicUserResolver: UserResolvers<GraphQlContext> = {
  todos,
};

export default BasicUserResolver;
