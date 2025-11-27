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
import { db } from "./db";

import futsalController from "./modules/futsals/controllers";
import userController from "./modules/users/controllers";
import timeSlotController from "./modules/time-slots/controllers";

async function main() {
  const server = fastify();

  await server.register(cors, {
    origin: ["http://localhost:5173", "http://192.168.18.9:5173"],
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  server.register(futsalController, { prefix: "futsals" });
  server.register(timeSlotController, { prefix: "futsals" });
  server.register(userController, { prefix: "users" });

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

  server.listen({ port: 4001 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

main();
