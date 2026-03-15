import { Elysia } from "elysia";
import { adminAuthMacro } from "../macros/admin-auth";
import { supplierController } from "../modules/suppliers";
import { customerController } from "../modules/customers";
import { purchaseItemController } from "../modules/purchase-items";
import { orderController } from "../modules/orders";
import { orderItemController } from "../modules/order-items";

export const adminRoutes = new Elysia()
    .use(adminAuthMacro)
    .get("/api/admin/detail", ({ user }) => user, {
        auth: true
    })
    .use(supplierController)
    .use(customerController)
    .use(purchaseItemController)
    .use(orderController)
    .use(orderItemController)
