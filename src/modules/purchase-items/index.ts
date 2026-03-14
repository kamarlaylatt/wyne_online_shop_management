import { Elysia } from "elysia"
import { PurchaseItemService } from "./service"
import { PurchaseItemCreateBody, PurchaseItemUpdateBody, IdParams, PaginationQuery } from "./model"

export const purchaseItemController = new Elysia({ prefix: "/api/admin/purchase-items" })
    .get("/", ({ query }) => PurchaseItemService.getAll(query.page, query.limit), { auth: true, query: PaginationQuery })
    .get("/:id", ({ params }) => PurchaseItemService.getById(params.id), { auth: true, params: IdParams })
    .post("/", ({ body }) => PurchaseItemService.create(body), { auth: true, body: PurchaseItemCreateBody })
    .put("/:id", ({ params, body }) => PurchaseItemService.update(params.id, body), { auth: true, params: IdParams, body: PurchaseItemUpdateBody })
    .delete("/:id", ({ params }) => PurchaseItemService.delete(params.id), { auth: true, params: IdParams })
