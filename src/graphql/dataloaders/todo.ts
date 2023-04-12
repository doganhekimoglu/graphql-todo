import Db from "../../utils/db";
import DataLoader from "dataloader";

export class TodoLoader {
  private batchTodosByUserId = new DataLoader(async (userIds: string[]) => {
    const todoList = await Db.todo.findMany({
      where: {
        userId: { in: userIds },
      },
    });

    return userIds.map((userId) => todoList.filter((todo) => todo.userId === userId));
  });

  async getTodosByUserId(id: string) {
    return this.batchTodosByUserId.load(id);
  }
}
