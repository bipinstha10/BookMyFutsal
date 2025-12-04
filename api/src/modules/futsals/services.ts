import { db } from "../../db";
import { futsalsTable } from "../../db/schema";
import { desc, eq } from "drizzle-orm";

export const getFutsals = async () => {
  return await db
    .select()
    .from(futsalsTable)
    .orderBy(desc(futsalsTable.createdAt));
};

export const getFutsal = async (numericId: number) => {
  return await db
    .select()
    .from(futsalsTable)
    .where(eq(futsalsTable.id, numericId));
};

export const createFutsal = async (
  futsalInput: typeof futsalsTable.$inferInsert
) => {
  return await db.insert(futsalsTable).values(futsalInput).returning();
};

export const updateFutsal = async (
  { name, location, imageURL }: typeof futsalsTable.$inferInsert,
  numericId: number
) => {
  return await db
    .update(futsalsTable)
    .set({ name, location, imageURL })
    .where(eq(futsalsTable.id, numericId))
    .returning();
};

export const deleteFutsal = async (numericId: number) => {
  return await db
    .delete(futsalsTable)
    .where(eq(futsalsTable.id, numericId))
    .returning();
};
