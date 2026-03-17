import { Elysia } from "elysia";
import { auth as adminAuth } from "../../lib/auth/admin.js";
import { supplierController } from "../modules/suppliers/index.js";
import { customerController } from "../modules/customers/index.js";
import { purchaseItemController } from "../modules/purchase-items/index.js";
import { orderController } from "../modules/orders/index.js";
import { orderItemController } from "../modules/order-items/index.js";
import { dashboardController } from "../modules/dashboard/index.js";

const betterAuth = new Elysia({ name: 'better-auth' })
    .mount(adminAuth.handler)
    .macro({
        auth: {
            async resolve({ status, request: { headers } }) {
                const session = await adminAuth.api.getSession({ headers })
                if (!session) return status(401)
                return {
                    user: session.user,
                    session: session.session
                }
            }
        }
    })

export const adminRoutes = new Elysia()
    .use(betterAuth)
    .get("/api/admin/detail", ({ user }) => user, {
        auth: true
    })
    .use(supplierController)
    .use(customerController)
    .use(purchaseItemController)
    .use(orderController)
    .use(orderItemController)
    .use(dashboardController);
