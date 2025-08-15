import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const futsalTable = pgTable("futsals", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  location: varchar({length: 255}).notNull(),
  imageURL: varchar({length: 500}).notNull(),
});
