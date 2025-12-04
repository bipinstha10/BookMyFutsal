import type { FastifyInstance } from "fastify";
import { createBookingHandler } from "./controllers";

async function bookingRoutes(server: FastifyInstance) {
  server.get("/:id/book", createBookingHandler);
}

export default bookingRoutes;
