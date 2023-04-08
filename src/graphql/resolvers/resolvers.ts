import Query from "../types/Query/Query";
import Mutation from "../types/Mutation/Mutation";
import User from "../types/User/User";
import { Resolvers } from "../resolvers-types.generated";
import Db from "../../utils/db";
import { User as UserType } from "@prisma/client";

export interface GraphQlContext {
  db: typeof Db;
  user?: UserType;
}

const resolvers: Resolvers<GraphQlContext> = {
  Query,
  Mutation,
  User,
};

export default resolvers;
