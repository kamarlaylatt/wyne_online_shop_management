import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "../../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })

const prisma = new PrismaClient({ adapter });
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    basePath: "/api/user/auth",
    trustedOrigins: process.env.TRUSTED_ORIGINS?.split(",") ?? [],
    emailAndPassword: {
        enabled: true,
    },
    user: {
        modelName: "User",
    },
    session: {
        modelName: "UserSession",
    },
    account: {
        modelName: "UserAccount"
    },
    verification: {
        modelName: "UserVerification"
    },
    advanced: {
        cookiePrefix: "user"
    }
});
