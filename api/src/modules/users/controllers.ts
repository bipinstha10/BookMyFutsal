import type { FastifyReply, FastifyRequest } from "fastify";
import { usersTable } from "../../db/schema";
import {
  comparePassword,
  createUser,
  generateAccessAndRefreshTokens,
  getUserByEmail,
  hashPassword,
  updateRefreshToken,
} from "./services";
import { cookieOptions } from "../../helpers/cookies";

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

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user.id
    );

    return reply
      .code(200)
      .setCookie("accessToken", accessToken, cookieOptions())
      .setCookie("refreshToken", refreshToken, cookieOptions())
      .send({
        status: 200,
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

export const logoutHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  console.log(request.user);
  await updateRefreshToken((request.user as any).id, null);

  return reply
    .code(200)
    .clearCookie("accessToken", cookieOptions())
    .clearCookie("refreshToken", cookieOptions())
    .send({ message: "Logged out successfully" });
};
