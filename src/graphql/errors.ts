import { GraphQLError } from "graphql/error";

export class AuthenticationError extends GraphQLError {
  constructor() {
    super("Authentication failed", { extensions: { code: "AUTH_ERROR" } });
  }
}

export class InvalidCredentialsError extends GraphQLError {
  constructor() {
    super("Invalid username or password", {
      extensions: { code: "WRONG_CREDENTIALS" },
    });
  }
}

export class InvalidTokenError extends GraphQLError {
  constructor() {
    super("Invalid token", {
      extensions: { code: "INVALID_TOKEN" },
    });
  }
}

export class SessionExpiredError extends GraphQLError {
  constructor() {
    super("Session expired, please re-login", {
      extensions: { code: "SESSION_EXPIRED" },
    });
  }
}

export class UserAlreadyExistsError extends GraphQLError {
  constructor(username: string) {
    super(`A user with the name: '${username}' already exists`, {
      extensions: { code: "USER_ALREADY_EXISTS" },
    });
  }
}
