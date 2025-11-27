import type { FastifyInstance } from "fastify";
import { usersTable } from "../../db/schema";
import {
  comparePassword,
  createUser,
  getUserByEmail,
  hashPassword,
} from "./model";

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

    const hashedPassword = await hashPassword(userInput.password);

    userInput.password = hashedPassword;

    const user = await createUser(userInput);

    return reply.code(201).send({
      status: 201,
      message: "User registred successfully.",
      // data: user,
    });
  });

  server.post("/login", async (request, reply) => {
    const userInput = request.body as typeof usersTable.$inferInsert;
    console.log(userInput);

    const user = await getUserByEmail(userInput.email);
    console.log("user", user);

    if (!user) {
      return reply.code(401).send({
        status: 401,
        message: "User not found",
      });
    }

    const isPasswordValid = await comparePassword(
      userInput.password,
      user.password
    );

    if (!isPasswordValid) {
      return reply.code(401).send({
        status: 401,
        message: "Invalid password",
      });
    }

    reply.code(201).send({
      status: 201,
      message: "Login successful",
    });
  });
}

export default userController;
