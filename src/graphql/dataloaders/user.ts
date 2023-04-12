import Db from "../../utils/db";
import DataLoader from "dataloader";

export class UserLoader {
  private batchUsersById = new DataLoader(async (userIds: string[]) => {
    const users = await Db.user.findMany({
      where: {
        id: { in: userIds },
        deleted: false,
      },
    });

    return userIds.map((userId) => users.find((user) => user.id === userId));
  });

  async getUserById(id: string) {
    return this.batchUsersById.load(id);
  }
}
