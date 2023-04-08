import { QueryResolvers } from "../resolvers-types.generated";
import { GraphQlContext } from "./resolvers";
import user from "../queries/user";
import { resolveWithAuth } from "../../utils/auth";

const BasicQueryResolver: QueryResolvers<GraphQlContext> = {
  user: resolveWithAuth(user),
};

export default BasicQueryResolver;
