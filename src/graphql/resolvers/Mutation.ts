import { MutationResolvers } from "../resolvers-types.generated";
import { GraphQlContext } from "./resolvers";
import signup from "../mutations/signup";
import signin from "../mutations/signin";
import createTodo from "../mutations/createTodo";
import deleteTodo from "../mutations/deleteTodo";
import { resolveWithAuth } from "../../utils/auth";
import updateTodoStatus from "../mutations/updateTodoStatus";

const Mutations: MutationResolvers<GraphQlContext> = {
  signup,
  signin,
  createTodo: resolveWithAuth(createTodo),
  deleteTodo: resolveWithAuth(deleteTodo),
  updateTodoStatus: resolveWithAuth(updateTodoStatus),
};

export default Mutations;
