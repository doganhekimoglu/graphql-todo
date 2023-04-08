import { QueryResolvers } from "../../resolvers-types.generated";
import { GraphQlContext } from "../../resolvers/resolvers";
import user from "./user";

const QueryResolver: QueryResolvers<GraphQlContext> = {
  user,
};

export default QueryResolver;
