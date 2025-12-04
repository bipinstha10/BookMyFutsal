import type { FastifyInstance } from "fastify";
import { loginHandler, registerUserHandler } from "./controllers";

async function userRoutes(server: FastifyInstance) {
  server.post("/", registerUserHandler);

  server.post("/login", loginHandler);
}

export default userRoutes;
