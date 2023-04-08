import { MutationResolvers } from "../resolvers-types.generated";
import { GraphQlContext } from "../resolvers/resolvers";
import { comparePasswords, createJWT } from "../../utils/auth";
import { InvalidCredentialsError } from "../errors";

const signin: MutationResolvers<GraphQlContext>["signin"] = async (_, { input: { username, password } }, { db }) => {
  const existingUser = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (!existingUser) {
    throw new InvalidCredentialsError();
  }

  const result = await comparePasswords(password, existingUser.password);

  if (!result) {
    throw new InvalidCredentialsError();
  }

  const user = {
    id: existingUser.id,
    username: existingUser.username,
    createdAt: existingUser.createdAt.toString(),
  };

  const token = createJWT(user);

  return { token, user };
};

export default signin;
