import { db } from "../../db";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import argon2 from "argon2";

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

export const hashPassword = async (password: string) => {
  return await argon2.hash(password);
};

export const comparePassword = async (password: string, hash: string) => {
  return await argon2.verify(hash, password);
};
