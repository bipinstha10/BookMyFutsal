import type { FastifyInstance } from "fastify";
import { usersTable } from "../../db/schema";
import { createUser } from "./model";

async function userController(server: FastifyInstance) {
  server.post("/", async (request, reply) => {
    const userInput = request.body as typeof usersTable.$inferInsert;
    const user = await createUser(userInput);

    reply.code(201).send({
      status: 201,
      message: "user registred successfully.",
      // data: user,
    });
  });
}

export default userController;
