import { TodoResolvers } from "../../resolvers-types.generated";
import { GraphQlContext } from "../../resolvers/resolvers";
import user from "./user";

const TodoResolver: TodoResolvers<GraphQlContext> = {
  user,
};

export default TodoResolver;
