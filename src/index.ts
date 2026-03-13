import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { adminRoutes } from "./routes/admin";
import { userRoutes } from "./routes/user";

const app = new Elysia()
    .get("/", () => ({ message: "Welcome to Wyne Shop API" }))
    .use(cors({
        origin: process.env.TRUSTED_ORIGINS ?? 'http://localhost:3001',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    }))
    .use(adminRoutes)
    .use(userRoutes)
    .listen({ port: process.env.PORT ?? 3000, hostname: "0.0.0.0" });

console.log(
  `🦊 Wyne Shop is running at ${app.server?.hostname}:${app.server?.port}`
);
