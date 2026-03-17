import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { expo } from "@better-auth/expo";
import { prisma } from "../../lib/prisma.js";
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    basePath: "/api/admin/auth",
    trustedOrigins: [
        ...(process.env.TRUSTED_ORIGINS?.split(",") ?? []),
        "wyneonlineshopapp://",
        ...(process.env.NODE_ENV === "development" ? [
            "exp://",
            "exp://**",
            "exp://192.168.*.*:*/**",
        ] : []),
    ],
    emailAndPassword: {
        enabled: true,
    },
    plugins: [expo()],
    user: {
        modelName: "Admin",
    },
    session: {
        modelName: "AdminSession",
    },
    account: {
        modelName: "AdminAccount"
    },
    verification:{
        modelName: "AdminVerification"
    },
    advanced: {
        cookiePrefix: "admin"
    }
});
