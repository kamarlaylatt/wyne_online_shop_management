import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaPg } from '@prisma/adapter-pg'
import { expo } from "@better-auth/expo";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "../../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })

const prisma = new PrismaClient({adapter});
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
