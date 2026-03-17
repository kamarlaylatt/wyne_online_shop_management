import { Elysia } from "elysia"
import { CustomerService } from "./service.js"
import { CustomerCreateBody, CustomerUpdateBody, IdParams } from "./model.js"

export const customerController = new Elysia({ prefix: "/api/admin/customers" })
    // @ts-ignore - auth macro registered in parent route
    .get("/", () => CustomerService.getAll(), { auth: true })
    // @ts-ignore
    .get("/:id", ({ params }) => CustomerService.getById(params.id), { auth: true, params: IdParams })
    // @ts-ignore
    .post("/", ({ body }) => CustomerService.create(body), { auth: true, body: CustomerCreateBody })
    // @ts-ignore
    .put("/:id", ({ params, body }) => CustomerService.update(params.id, body), { auth: true, params: IdParams, body: CustomerUpdateBody })
    // @ts-ignore
    .delete("/:id", ({ params }) => CustomerService.delete(params.id), { auth: true, params: IdParams })
