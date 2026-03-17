import { Elysia } from "elysia"
import { PurchaseItemService } from "./service.js"
import { PurchaseItemCreateBody, PurchaseItemUpdateBody, IdParams, PaginationQuery } from "./model.js"

export const purchaseItemController = new Elysia({ prefix: "/api/admin/purchase-items" })
    // @ts-ignore - auth macro registered in parent route
    .get("/", ({ query }) => PurchaseItemService.getAll(query.page, query.limit), { auth: true, query: PaginationQuery })
    // @ts-ignore
    .get("/:id", ({ params }) => PurchaseItemService.getById(params.id), { auth: true, params: IdParams })
    // @ts-ignore
    .post("/", ({ body }) => PurchaseItemService.create(body), { auth: true, body: PurchaseItemCreateBody })
    // @ts-ignore
    .put("/:id", ({ params, body }) => PurchaseItemService.update(params.id, body), { auth: true, params: IdParams, body: PurchaseItemUpdateBody })
    // @ts-ignore
    .delete("/:id", ({ params }) => PurchaseItemService.delete(params.id), { auth: true, params: IdParams })
