import { Elysia } from "elysia"
import { OrderService } from "./service"
import { OrderCreateBody, OrderUpdateBody, IdParams, PaginationQuery } from "./model"

export const orderController = new Elysia({ prefix: "/api/admin/orders" })
    // @ts-ignore - auth macro registered in parent route
    .get("/", ({ query }) => OrderService.getAll(query.page, query.limit, query as any), { auth: true, query: PaginationQuery })
    // @ts-ignore
    .get("/preload", () => OrderService.preload(), { auth: true })
    // @ts-ignore
    .get("/:id", ({ params }) => OrderService.getById(params.id), { auth: true, params: IdParams })
    // @ts-ignore
    .post("/", ({ body }) => OrderService.create(body), { auth: true, body: OrderCreateBody })
    // @ts-ignore
    .put("/:id", ({ params, body }) => OrderService.update(params.id, body), { auth: true, params: IdParams, body: OrderUpdateBody })
    // @ts-ignore
    .delete("/:id", ({ params }) => OrderService.delete(params.id), { auth: true, params: IdParams })
