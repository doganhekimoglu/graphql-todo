import { createJWT, hashPassword } from "../../utils/auth";
import { MutationResolvers } from "../resolvers-types.generated";
import { GraphQlContext } from "../resolvers/resolvers";
import { PRISMA_UNIQUE_CONSTRAINT } from "../../constants";
import { UserAlreadyExistsError } from "../errors";

const signup: MutationResolvers<GraphQlContext>["signup"] = async (_, { input: { username, password } }, { db }) => {
  try {
    return await db.$transaction(async (ctx) => {
      const newUser = await ctx.user.create({
        data: {
          username,
          password: await hashPassword(password),
        },
      });

      const user = {
        id: newUser.id,
        username: newUser.username,
        createdAt: newUser.createdAt.toString(),
      };

      const token = createJWT(user);

      return { token, user };
    });
  } catch (e: any) {
    if (e.code === PRISMA_UNIQUE_CONSTRAINT) {
      throw new UserAlreadyExistsError(username);
    }
    throw e;
  }
};

export default signup;
