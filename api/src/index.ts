import fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import { env } from "./config/env";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import cookie, { type FastifyCookieOptions } from "@fastify/cookie";
import userRoutes from "./modules/users/routes";
import futsalRoutes from "./modules/futsals/routes";
import timeSlotRoutes from "./modules/time-slots/routes";
import bookingRoutes from "./modules/bookings/routes";

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}

async function main() {
  const server = fastify();

  await server.register(cors, {
    origin: ["http://localhost:5173", "http://192.168.18.9:5173"],
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  server.register(jwt, {
    secret: "asjdlfjasldjflajsdlfjasldjflasdjf",
  });

  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (error) {
        return reply.send(error);
      }
    }
  );

  server.register(cookie, {
    secret: "my-secret",
    parseOptions: {
      httpOnly: true,
      secure: true,
    },
  } as FastifyCookieOptions);

  server.register(futsalRoutes, { prefix: "futsals" });
  server.register(timeSlotRoutes, { prefix: "futsals" });
  server.register(bookingRoutes, { prefix: "futsals" });
  server.register(userRoutes, { prefix: "users" });

  server.listen({ port: env.PORT }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

main();
