import Query from "../types/Query/Query";
import Mutation from "../types/Mutation/Mutation";
import User from "../types/User/User";
import Todo from "../types/Todo/Todo";
import { Resolvers } from "../resolvers-types.generated";
import Db from "../../utils/db";
import { User as UserType } from "@prisma/client";
import { TodoLoader, UserLoader } from "../dataloaders";

export interface GraphQlContext {
  db: typeof Db;
  user?: UserType;
  todoLoader?: TodoLoader;
  userLoader?: UserLoader;
}

const resolvers: Resolvers<GraphQlContext> = {
  Query,
  Mutation,
  User,
  Todo,
};

export default resolvers;
