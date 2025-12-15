import type { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { getUserById } from "./services";

export const verifyJWT = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const token =
      request.cookies.accessToken ||
      request?.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return reply.code(401).send("Unauthorized request");
    }

    const decodedToken = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as any;

    const user = await getUserById(decodedToken.id);

    if (!user) {
      return reply.send("Invalid access token");
    }

    request.user = user;
  } catch (error) {
    reply.send("Invalid access token");
  }
};
