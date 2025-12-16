import type { FastifyInstance } from "fastify";
import {
  loginHandler,
  logoutHandler,
  registerUserHandler,
} from "./controllers";
import { verifyJWT } from "./hooks";

async function userRoutes(server: FastifyInstance) {
  server.post("/", registerUserHandler);

  server.post("/login", loginHandler);

  server.post("/logout", { preHandler: [verifyJWT] }, logoutHandler);
}

export default userRoutes;
