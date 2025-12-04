import type { FastifyInstance } from "fastify";
import {
  createFutsalHandler,
  deleteFutsalHandler,
  getFutsalHandler,
  getFutsalsHandler,
  updateFutalHandler,
} from "./controllers";

async function futsalRoutes(server: FastifyInstance) {
  // Get all futsals
  server.get("/", getFutsalsHandler);

  // Get single futsal
  server.get("/:id", getFutsalHandler);

  // Create futsal
  server.post("/", createFutsalHandler);

  // Delete futsal
  server.delete("/:id", deleteFutsalHandler);

  // Update futsal
  server.put("/:id", updateFutalHandler);
}

export default futsalRoutes;
