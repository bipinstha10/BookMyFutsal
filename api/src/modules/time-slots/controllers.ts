import { eq, and } from "drizzle-orm";
import { db } from "../../db";
import { bookingsTable, timeSlotsTable } from "../../db/schema";
import type { FastifyReply, FastifyRequest } from "fastify";

export const getTimeSlotsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
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
};
