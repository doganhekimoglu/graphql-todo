import jwt, { TokenExpiredError } from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config";
import { Resolver, ResolverFn, ResolverTypeWrapper } from "../graphql/resolvers-types.generated";
import { GraphQlContext } from "../graphql/resolvers/resolvers";
import { AuthenticationError, SessionExpiredError } from "../graphql/errors";

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

function isResolveFn(fn: any): fn is ResolverFn<any, any, any, any> {
  return typeof fn === "function";
}

export function resolveWithAuth<T, U, K>(resolver: T extends Resolver<U, any, any, K> ? T : never) {
  return function (root: any, params: K, context: GraphQlContext, info: any): ResolverTypeWrapper<U> {
    if (!context.user) {
      throw new AuthenticationError();
    }
    if (isResolveFn(resolver)) {
      return resolver(root, params, context, info);
    }
  };
}
