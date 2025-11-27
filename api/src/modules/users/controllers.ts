import type { FastifyInstance } from "fastify";
import { usersTable } from "../../db/schema";
import { createUser, getUserByEmail } from "./model";

async function userController(server: FastifyInstance) {
  server.post("/", async (request, reply) => {
    const userInput = request.body as typeof usersTable.$inferInsert;

    console.log(userInput);

    const userExists = await getUserByEmail(userInput.email);

    console.log("userExists", userExists);

    if (userExists) {
      return reply.code(409).send({
        status: 409,
        message: "Email already registered",
      });
    }

    const user = await createUser(userInput);

    return reply.code(201).send({
      status: 201,
      message: "user registred successfully.",
      // data: user,
    });
  });
}

export default userController;
