import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // Users table
    users: defineTable({
        clerkId: v.string(),
        email: v.string(),
        name: v.optional(v.string()),
        role: v.union(v.literal("user"), v.literal("admin")),
        subscriptionTier: v.union(
            v.literal("free"),
            v.literal("basic"),
            v.literal("premium"),
            v.literal("vip")
        ),
        subscriptionExpiry: v.optional(v.number()),
        createdAt: v.number(),
    })
        .index("by_clerk_id", ["clerkId"])
        .index("by_email", ["email"]),

    // Trading Signals table
    signals: defineTable({
        pair: v.string(), // EUR/USD, GBP/USD, etc.
        type: v.union(v.literal("CALL"), v.literal("PUT")),
        power: v.number(), // 65-95%
        algorithm: v.union(
            v.literal("Adaptive"),
            v.literal("Neural"),
            v.literal("Trend")
        ),
        entryPrice: v.number(),
        targetPrice: v.optional(v.number()),
        stopLoss: v.optional(v.number()),
        expiryTime: v.number(), // Timestamp when signal expires
        status: v.union(
            v.literal("active"),
            v.literal("expired"),
            v.literal("won"),
            v.literal("lost")
        ),
        result: v.optional(v.string()),
        createdAt: v.number(),
    })
        .index("by_status", ["status"])
        .index("by_pair", ["pair"])
        .index("by_created_at", ["createdAt"]),

    // Subscriptions table
    subscriptions: defineTable({
        userId: v.id("users"),
        tier: v.string(),
        startDate: v.number(),
        endDate: v.number(),
        status: v.union(v.literal("active"), v.literal("cancelled"), v.literal("expired")),
        stripeSubscriptionId: v.optional(v.string()),
    })
        .index("by_user", ["userId"])
        .index("by_status", ["status"]),

    // Notifications table
    notifications: defineTable({
        userId: v.id("users"),
        type: v.union(
            v.literal("signal"),
            v.literal("system"),
            v.literal("subscription")
        ),
        title: v.string(),
        message: v.string(),
        read: v.boolean(),
        signalId: v.optional(v.id("signals")),
        createdAt: v.number(),
    })
        .index("by_user", ["userId"])
        .index("by_read", ["userId", "read"]),

    // Settings table
    settings: defineTable({
        key: v.string(),
        value: v.string(),
        updatedAt: v.number(),
    }).index("by_key", ["key"]),
});
