import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaPg } from '@prisma/adapter-pg'
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
    trustedOrigins: process.env.TRUSTED_ORIGINS?.split(",") ?? [],
    emailAndPassword: {
        enabled: true,
    },
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
