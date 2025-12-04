import { eq, and } from "drizzle-orm";

import { bookingsTable } from "../../db/schema";
import { db } from "../../db";
import type { FastifyReply, FastifyRequest } from "fastify";

export const createBookingHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
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
};
