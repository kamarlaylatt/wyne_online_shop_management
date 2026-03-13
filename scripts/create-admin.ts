import { auth } from "../lib/auth/admin";

const [,, email, password, name] = process.argv;

if (!email || !password || !name) {
    console.error("Usage: bun run scripts/create-admin.ts <email> <password> <name>");
    process.exit(1);
}

const result = await auth.api.signUpEmail({
    body: { email, password, name }
});

console.log("✓ Admin created:", result.user.email);
process.exit(0);
