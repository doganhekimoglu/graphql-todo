import { QueryResolvers } from "../../resolvers-types.generated";
import { GraphQlContext } from "../../resolvers/resolvers";
import user from "./user";
import todos from "./todos";
import { resolveWithAuth } from "../../../utils/auth";

const QueryResolver: QueryResolvers<GraphQlContext> = {
  user: resolveWithAuth(user),
  todos: resolveWithAuth(todos),
};

export default QueryResolver;
