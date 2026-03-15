import { Elysia } from "elysia"
import { adminAuthMacro } from "../../macros/admin-auth"
import { CustomerService } from "./service"
import { CustomerCreateBody, CustomerUpdateBody, IdParams } from "./model"

export const customerController = new Elysia({ prefix: "/api/admin/customers" })
    .use(adminAuthMacro)
    .get("/", () => CustomerService.getAll(), { auth: true })
    .get("/:id", ({ params }) => CustomerService.getById(params.id), { auth: true, params: IdParams })
    .post("/", ({ body }) => CustomerService.create(body), { auth: true, body: CustomerCreateBody })
    .put("/:id", ({ params, body }) => CustomerService.update(params.id, body), { auth: true, params: IdParams, body: CustomerUpdateBody })
    .delete("/:id", ({ params }) => CustomerService.delete(params.id), { auth: true, params: IdParams })
