import type { FastifyReply, FastifyRequest } from "fastify";
import { usersTable } from "../../db/schema";
import {
  comparePassword,
  createUser,
  generateAccessToken,
  generateRefreshToken,
  getUserByEmail,
  hashPassword,
} from "./services";

export const registerUserHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const userInput = request.body as typeof usersTable.$inferInsert;

  try {
    const userExists = await getUserByEmail(userInput.email);

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
      data: user,
    });
  } catch (error) {
    reply.code(500).send(error);
  }
};

export const loginHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const userInput = request.body as typeof usersTable.$inferInsert;

  try {
    const user = await getUserByEmail(userInput.email);

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

    const { id, email, name } = user;

    const accessToken = await generateAccessToken({ id, email, name });
    const refreshToken = await generateRefreshToken({ id });

    console.log(user);

    return reply
      .code(201)
      .setCookie("accessToken", accessToken)
      .setCookie("refreshToken", refreshToken)
      .send({
        status: 201,
        message: "Login successful",
        data: {
          accessToken,
          refreshToken,
        },
      });
  } catch (error) {
    reply.code(500).send(error);
  }
};
