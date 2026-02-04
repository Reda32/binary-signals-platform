import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get or create user from Clerk ID
export const getCurrentUser = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();

        return user;
    },
});

// Create a new user
export const createUser = mutation({
    args: {
        clerkId: v.string(),
        email: v.string(),
        name: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();

        if (existing) {
            return existing._id;
        }

        const userId = await ctx.db.insert("users", {
            clerkId: args.clerkId,
            email: args.email,
            name: args.name,
            role: "user",
            subscriptionTier: "free",
            createdAt: Date.now(),
        });

        return userId;
    },
});

// Update user profile
export const updateUser = mutation({
    args: {
        userId: v.id("users"),
        name: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.userId, {
            name: args.name,
        });
    },
});

// Get all users (admin only)
export const getAllUsers = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("users").order("desc").collect();
    },
});

// Update user subscription
export const updateUserSubscription = mutation({
    args: {
        userId: v.id("users"),
        tier: v.union(
            v.literal("free"),
            v.literal("basic"),
            v.literal("premium"),
            v.literal("vip")
        ),
        months: v.number(),
    },
    handler: async (ctx, args) => {
        const expiryDate = Date.now() + args.months * 30 * 24 * 60 * 60 * 1000;

        await ctx.db.patch(args.userId, {
            subscriptionTier: args.tier,
            subscriptionExpiry: expiryDate,
        });

        // Create subscription record
        await ctx.db.insert("subscriptions", {
            userId: args.userId,
            tier: args.tier,
            startDate: Date.now(),
            endDate: expiryDate,
            status: "active",
        });
    },
});

// Check if user is admin
export const isAdmin = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();

        return user?.role === "admin";
    },
});
