import { Clerk } from "@clerk/clerk-sdk-node";

if (!process.env.CLERK_SECRET_KEY) {
  console.error("❌ Missing CLERK_SECRET_KEY in environment variables");
}

export const clerkClient = new Clerk({
  secretKey: process.env.CLERK_SECRET_KEY,
});
