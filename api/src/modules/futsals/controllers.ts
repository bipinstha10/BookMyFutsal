import type { FastifyInstance } from "fastify";
import { futsalsTable } from "../../db/schema";
import {
  createFutsal,
  deleteFutsal,
  getFutsal,
  getFutsals,
  updateFutsal,
} from "./model";

async function futsalController(server: FastifyInstance) {
  // Get all futsals
  server.get("/", async (_, reply) => {
    const futsals = await getFutsals();

    reply.send({
      status: 200,
      message: "Success",
      data: futsals,
    });
  });

  // Create futsal
  server.post("/", async (request, reply) => {
    const futsalInput = request.body as typeof futsalsTable.$inferInsert;

    const futsal = await createFutsal(futsalInput);

    reply.code(201).send({
      status: 201,
      message: "Futsal created successfully.",
      data: futsal,
    });
  });

  // Delete futsal
  server.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const numericId = Number(id);

    const futsal = await deleteFutsal(numericId);

    reply.send({
      status: 200,
      message: "Futsal deleted successfully.",
      data: futsal,
    });
  });

  // Get single futsal
  server.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const numericId = Number(id);

    const futsal = await getFutsal(numericId);

    reply.send({
      status: 200,
      message: "Data fetched successfully.",
      data: futsal[0],
    });
  });

  // Update futsal
  server.put("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const numericId = Number(id);

    const { name, location, imageURL } =
      request.body as typeof futsalsTable.$inferInsert;

    const futsal = await updateFutsal({ name, location, imageURL }, numericId);

    reply.send({
      status: 200,
      message: "Futsal updated successfully.",
      data: futsal[0],
    });
  });
}

export default futsalController;
