import { Elysia, Context } from "elysia";
import { auth as adminAuth } from "../../lib/auth/admin";
import { supplierController } from "../modules/suppliers";
import { customerController } from "../modules/customers";
import { purchaseItemController } from "../modules/purchase-items";
import { orderController } from "../modules/orders";
import { orderItemController } from "../modules/order-items";

// Auth middleware with macro
const betterAuth = new Elysia({ name: 'better-auth' })
    .mount(adminAuth.handler)
    .macro({
        auth: {
            async resolve({ status, request: { headers } }) {
                const session = await adminAuth.api.getSession({
                    headers
                })

                if (!session) return status(401)

                return {
                    user: session.user,
                    session: session.session
                }
            }
        }
    })

const betterAuthView = (context: Context) => {
    const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"]
    // validate request method
    if(BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
        return adminAuth.handler(context.request);
    } else {
        return Response.json({
            success: false,
            message: "Method not allowed"
        }, { status: 405 })
    }
}

export const adminRoutes = new Elysia()
    .use(betterAuth)
    .all("/api/admin/auth/*", betterAuthView)
    .get("/api/admin/detail", ({ user }) => user, {
        auth: true
    })
    .use(supplierController)
    .use(customerController)
    .use(purchaseItemController)
    .use(orderController)
    .use(orderItemController)
