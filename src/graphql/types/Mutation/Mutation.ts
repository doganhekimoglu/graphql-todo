import { MutationResolvers } from "../../resolvers-types.generated";
import { GraphQlContext } from "../../resolvers/resolvers";
import signup from "./signup";
import signin from "./signin";
import createTodo from "./createTodo";
import deleteTodo from "./deleteTodo";
import updateTodoStatus from "./updateTodoStatus";

const MutationResolver: MutationResolvers<GraphQlContext> = {
  signup,
  signin,
  createTodo,
  deleteTodo,
  updateTodoStatus,
};

export default MutationResolver;
