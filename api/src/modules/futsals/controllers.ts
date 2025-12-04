import type { FastifyReply, FastifyRequest } from "fastify";
import { futsalsTable } from "../../db/schema";
import {
  createFutsal,
  deleteFutsal,
  getFutsal,
  getFutsals,
  updateFutsal,
} from "./services";

export const getFutsalsHandler = async (
  _: FastifyRequest,
  reply: FastifyReply
) => {
  const futsals = await getFutsals();

  reply.send({
    status: 200,
    message: "Success",
    data: futsals,
  });
};
export const getFutsalHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const numericId = Number(id);

  const futsal = await getFutsal(numericId);

  reply.send({
    status: 200,
    message: "Data fetched successfully.",
    data: futsal[0],
  });
};

export const createFutsalHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const futsalInput = request.body as typeof futsalsTable.$inferInsert;

  const futsal = await createFutsal(futsalInput);

  reply.code(201).send({
    status: 201,
    message: "Futsal created successfully.",
    data: futsal,
  });
};

export const deleteFutsalHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const numericId = Number(id);

  const futsal = await deleteFutsal(numericId);

  reply.send({
    status: 200,
    message: "Futsal deleted successfully.",
    data: futsal,
  });
};

export const updateFutalHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
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
};
