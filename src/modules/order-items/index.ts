import { Elysia } from "elysia"
import { OrderItemService } from "./service"
import { OrderItemCreateBody, OrderItemUpdateBody, IdParams, OrderIdQuery } from "./model"

export const orderItemController = new Elysia({ prefix: "/api/admin/order-items" })
    .get("/", ({ query }) => OrderItemService.getByOrderId(query.orderId), { auth: true, query: OrderIdQuery })
    .get("/:id", ({ params }) => OrderItemService.getById(params.id), { auth: true, params: IdParams })
    .post("/", ({ body }) => OrderItemService.create(body), { auth: true, body: OrderItemCreateBody })
    .put("/:id", ({ params, body }) => OrderItemService.update(params.id, body), { auth: true, params: IdParams, body: OrderItemUpdateBody })
    .delete("/:id", ({ params }) => OrderItemService.delete(params.id), { auth: true, params: IdParams })
