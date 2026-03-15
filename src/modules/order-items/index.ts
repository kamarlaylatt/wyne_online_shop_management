import { Elysia } from "elysia"
import { OrderItemService } from "./service"
import { OrderItemCreateBody, OrderItemUpdateBody, IdParams, OrderIdQuery } from "./model"

export const orderItemController = new Elysia({ prefix: "/api/admin/order-items" })
    // @ts-ignore - auth macro registered in parent route
    .get("/", ({ query }) => OrderItemService.getByOrderId(query.orderId), { auth: true, query: OrderIdQuery })
    // @ts-ignore
    .get("/:id", ({ params }) => OrderItemService.getById(params.id), { auth: true, params: IdParams })
    // @ts-ignore
    .post("/", ({ body }) => OrderItemService.create(body), { auth: true, body: OrderItemCreateBody })
    // @ts-ignore
    .put("/:id", ({ params, body }) => OrderItemService.update(params.id, body), { auth: true, params: IdParams, body: OrderItemUpdateBody })
    // @ts-ignore
    .delete("/:id", ({ params }) => OrderItemService.delete(params.id), { auth: true, params: IdParams })
