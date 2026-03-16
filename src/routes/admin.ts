import { Elysia } from "elysia";
import { auth as adminAuth } from "../../lib/auth/admin";
import { supplierController } from "../modules/suppliers";
import { customerController } from "../modules/customers";
import { purchaseItemController } from "../modules/purchase-items";
import { orderController } from "../modules/orders";
import { orderItemController } from "../modules/order-items";
import { dashboardController } from "../modules/dashboard";

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