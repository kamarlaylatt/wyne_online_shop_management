import { Elysia } from "elysia"
import { SupplierService } from "./service.js"
import { SupplierCreateBody, SupplierUpdateBody, IdParams } from "./model.js"

export const supplierController = new Elysia({ prefix: "/api/admin/suppliers" })
    // @ts-ignore - auth macro registered in parent route
    .get("/", () => SupplierService.getAll(), { auth: true })
    // @ts-ignore
    .get("/:id", ({ params }) => SupplierService.getById(params.id), { auth: true, params: IdParams })
    // @ts-ignore
    .post("/", ({ body }) => SupplierService.create(body), { auth: true, body: SupplierCreateBody })
    // @ts-ignore
    .put("/:id", ({ params, body }) => SupplierService.update(params.id, body), { auth: true, params: IdParams, body: SupplierUpdateBody })
    // @ts-ignore
    .delete("/:id", ({ params }) => SupplierService.delete(params.id), { auth: true, params: IdParams })
