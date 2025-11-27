import { db } from "../../db";
import { usersTable } from "../../db/schema";

export const createUser = async (userInput: typeof usersTable.$inferInsert) => {
  return await db.insert(usersTable).values(userInput).returning();
};
