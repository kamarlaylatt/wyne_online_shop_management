import { Elysia } from "elysia";
import { auth as adminAuth } from "../../lib/auth/admin";

export const adminAuthMacro = new Elysia({ name: 'better-auth' })
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
