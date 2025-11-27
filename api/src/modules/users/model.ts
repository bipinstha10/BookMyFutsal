import { db } from "../../db";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  return user;
};
export const createUser = async (userInput: typeof usersTable.$inferInsert) => {
  return await db.insert(usersTable).values(userInput).returning();
};
