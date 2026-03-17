import { Elysia, Context } from "elysia";
import { auth as userAuth } from "../../lib/auth/user.js";

const betterAuth = new Elysia({ name: 'better-auth-user' })
    .mount(userAuth.handler)
    .macro({
        auth: {
            async resolve({ status, request: { headers } }) {
                const session = await userAuth.api.getSession({
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
    if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
        return userAuth.handler(context.request);
    } else {
        return Response.json({
            success: false,
            message: "Method not allowed"
        }, { status: 405 })
    }
}

export const userRoutes = new Elysia()
    .use(betterAuth)
    .all("/api/user/auth/*", betterAuthView)
    .get("/api/user/detail", ({ user }) => user, {
        auth: true
    })
