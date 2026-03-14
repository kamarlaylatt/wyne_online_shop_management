import { Elysia } from "elysia"
import { OrderService } from "./service"
import { OrderCreateBody, OrderUpdateBody, IdParams, PaginationQuery } from "./model"

export const orderController = new Elysia({ prefix: "/api/admin/orders" })
    .get("/", ({ query }) => OrderService.getAll(query.page, query.limit), { auth: true, query: PaginationQuery })
    .get("/preload", () => OrderService.preload(), { auth: true })
    .get("/:id", ({ params }) => OrderService.getById(params.id), { auth: true, params: IdParams })
    .post("/", ({ body }) => OrderService.create(body), { auth: true, body: OrderCreateBody })
    .put("/:id", ({ params, body }) => OrderService.update(params.id, body), { auth: true, params: IdParams, body: OrderUpdateBody })
    .delete("/:id", ({ params }) => OrderService.delete(params.id), { auth: true, params: IdParams })
