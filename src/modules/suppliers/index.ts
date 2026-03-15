import { Elysia } from "elysia"
import { adminAuthMacro } from "../../macros/admin-auth"
import { SupplierService } from "./service"
import { SupplierCreateBody, SupplierUpdateBody, IdParams } from "./model"

export const supplierController = new Elysia({ prefix: "/api/admin/suppliers" })
    .use(adminAuthMacro)
    .get("/", () => SupplierService.getAll(), { auth: true })
    .get("/:id", ({ params }) => SupplierService.getById(params.id), { auth: true, params: IdParams })
    .post("/", ({ body }) => SupplierService.create(body), { auth: true, body: SupplierCreateBody })
    .put("/:id", ({ params, body }) => SupplierService.update(params.id, body), { auth: true, params: IdParams, body: SupplierUpdateBody })
    .delete("/:id", ({ params }) => SupplierService.delete(params.id), { auth: true, params: IdParams })
