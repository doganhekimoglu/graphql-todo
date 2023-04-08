import jwt, { TokenExpiredError } from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config";
import { Resolver, ResolverFn, ResolverTypeWrapper } from "../graphql/resolvers-types.generated";
import { GraphQlContext } from "../graphql/resolvers/resolvers";
import { AuthenticationError, SessionExpiredError } from "../graphql/errors";
import { GraphQLResolveInfo } from "graphql";

interface IUser {
  id: string;
  username: string;
}

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};

export const createJWT = (user: IUser) => {
  return jwt.sign({ id: user.id, username: user.username }, config.secrets.jwt, { expiresIn: "1d" });
};

export const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, config.secrets.jwt) as IUser;
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      throw new SessionExpiredError();
    }
    throw e;
  }
};

function assertIsResolveFn(fn: any): asserts fn is ResolverFn<any, any, any, any> {
  if (typeof fn !== "function") {
    throw new Error("fn is not callable");
  }
}

export function resolveWithAuth<TResult, TArgs, TParent>(resolver: Resolver<TResult, TParent, GraphQlContext, TArgs>) {
  assertIsResolveFn(resolver);
  return function (root: TParent, params: TArgs, context: GraphQlContext, info: GraphQLResolveInfo): ResolverTypeWrapper<TResult> {
    if (!context.user) {
      throw new AuthenticationError();
    }
    return resolver(root, params, context, info);
  };
}
