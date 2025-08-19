import { timestamp, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const futsalsTable = pgTable("futsals", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  location: varchar({length: 255}).notNull(),
  imageURL: varchar({length: 500}).notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});
