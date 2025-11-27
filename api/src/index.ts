import fastify from "fastify";
import cors from "@fastify/cors";
import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { desc, eq, and } from "drizzle-orm";

import {
  futsalsTable,
  timeSlotsTable,
  bookingsTable,
  usersTable,
} from "./db/schema";

async function main() {
  // -----------------------------
  // Database & Server Setup
  // -----------------------------
  const db = drizzle(process.env.DATABASE_URL!);
  const server = fastify();

  await server.register(cors, {
    origin: ["http://localhost:5173", "http://192.168.18.9:5173"],
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  // -----------------------------
  // FUTSALS CRUD ROUTES
  // -----------------------------

  // Get all futsals
  server.get("/futsals", async (_, reply) => {
    const futsals = await db
      .select()
      .from(futsalsTable)
      .orderBy(desc(futsalsTable.createdAt));

    reply.send({
      status: 200,
      message: "Success",
      data: futsals,
    });
  });

  // Create futsal
  server.post("/futsals", async (request, reply) => {
    const futsalInput = request.body as typeof futsalsTable.$inferInsert;
    const futsal = await db
      .insert(futsalsTable)
      .values(futsalInput)
      .returning();

    reply.code(201).send({
      status: 201,
      message: "Futsal created successfully.",
      data: futsal,
    });
  });

  // Delete futsal
  server.delete("/futsals/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const numericId = Number(id);

    const futsal = await db
      .delete(futsalsTable)
      .where(eq(futsalsTable.id, numericId))
      .returning();

    reply.send({
      status: 200,
      message: "Futsal deleted successfully.",
      data: futsal,
    });
  });

  // Get single futsal
  server.get("/futsals/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const numericId = Number(id);

    const futsal = await db
      .select()
      .from(futsalsTable)
      .where(eq(futsalsTable.id, numericId));

    reply.send({
      status: 200,
      message: "Data fetched successfully.",
      data: futsal[0],
    });
  });

  // Update futsal
  server.put("/futsals/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const numericId = Number(id);

    const { name, location, imageURL } =
      request.body as typeof futsalsTable.$inferInsert;

    const futsal = await db
      .update(futsalsTable)
      .set({ name, location, imageURL })
      .where(eq(futsalsTable.id, numericId))
      .returning();

    reply.send({
      status: 200,
      message: "Futsal updated successfully.",
      data: futsal[0],
    });
  });

  // -----------------------------
  // TIME SLOTS & BOOKINGS
  // -----------------------------

  // Get available + booked time slots
  server.get("/futsals/:id/slots", async (request, reply) => {
    const { id } = request.params as { id: string };
    const futsalId = Number(id);

    const { date } = request.query as { date: string };
    if (!date) {
      return reply.code(400).send({
        status: 400,
        message: "Query parameter 'date' is required",
        data: [],
      });
    }

    const allSlots = await db.select().from(timeSlotsTable);

    const bookedSlots = await db
      .select()
      .from(bookingsTable)
      .where(
        and(
          eq(bookingsTable.futsalId, futsalId),
          eq(bookingsTable.bookingDate, date)
        )
      );

    const slotsWithStatus = allSlots.map((slot) => {
      const booking = bookedSlots.find((b) => b.timeSlotId === slot.id);

      return {
        id: slot.id,
        startTime: slot.startTime,
        endTime: slot.endTime,
        isBooked: Boolean(booking),
        customerName: booking?.customerName ?? null,
      };
    });

    reply.send({
      status: 200,
      message: "Slots fetched successfully",
      data: slotsWithStatus,
    });
  });

  // Book a slot
  server.post("/futsals/:id/book", async (request, reply) => {
    const { id } = request.params as { id: string };
    const futsalId = Number(id);

    const { timeSlotId, bookingDate, customerName, phone } = request.body as {
      timeSlotId: number;
      bookingDate: string;
      customerName: string;
      phone?: string;
    };

    // Check existing booking
    const existing = await db
      .select()
      .from(bookingsTable)
      .where(
        and(
          eq(bookingsTable.futsalId, futsalId),
          eq(bookingsTable.timeSlotId, timeSlotId),
          eq(bookingsTable.bookingDate, bookingDate)
        )
      );

    if (existing.length > 0) {
      return reply.code(409).send({
        status: 409,
        message: "This slot is already booked",
      });
    }

    // Insert booking
    const booking = await db
      .insert(bookingsTable)
      .values({ futsalId, timeSlotId, bookingDate, customerName, phone })
      .returning();

    reply.code(201).send({
      status: 201,
      message: "Booking created successfully",
      data: booking[0],
    });
  });

  server.post("/users", async (request, reply) => {
    const userInput = request.body as typeof usersTable.$inferInsert;
    const user = await db.insert(usersTable).values(userInput).returning();

    reply.code(201).send({
      status: 201,
      message: "user registred successfully.",
      // data: user,
    });
  });

  // -----------------------------
  // Start Server
  // -----------------------------
  server.listen({ port: 4001 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

main();
