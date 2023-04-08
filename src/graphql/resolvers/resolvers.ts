import Query from "./Query";
import Mutation from "./Mutation";
import User from "./User";
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
