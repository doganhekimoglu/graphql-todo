import { QueryResolvers } from "../../resolvers-types.generated";
import { GraphQlContext } from "../../resolvers/resolvers";
import user from "./user";
import todos from "./todos";

const QueryResolver: QueryResolvers<GraphQlContext> = {
  user,
  todos,
};

export default QueryResolver;
