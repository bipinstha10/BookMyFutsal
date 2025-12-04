import type { FastifyInstance } from "fastify";
import { getTimeSlotsHandler } from "./controllers";

async function timeSlotRoutes(server: FastifyInstance) {
  server.get("/:id/slots", getTimeSlotsHandler);
}

export default timeSlotRoutes;
