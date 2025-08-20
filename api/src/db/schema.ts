import { timestamp, integer, pgTable, varchar, time, date } from "drizzle-orm/pg-core";

export const futsalsTable = pgTable("futsals", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  location: varchar({ length: 255 }).notNull(),
  imageURL: varchar({ length: 500 }).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

// Hourly time slots (same for all futsals)
export const timeSlotsTable = pgTable("time_slots", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
});

// Bookings made by admin for customers
export const bookingsTable = pgTable("bookings", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  futsalId: integer("futsal_id")
    .notNull()
    .references(() => futsalsTable.id),
  timeSlotId: integer("time_slot_id")
    .notNull()
    .references(() => timeSlotsTable.id),
  bookingDate: date("booking_date").notNull(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  status: varchar("status", { length: 50 }).default("booked"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
