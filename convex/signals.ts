import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all active signals
export const getActiveSignals = query({
    args: {},
    handler: async (ctx) => {
        const signals = await ctx.db
            .query("signals")
            .withIndex("by_status", (q) => q.eq("status", "active"))
            .order("desc")
            .take(100);

        return signals;
    },
});

// Get signals with filters
export const getSignals = query({
    args: {
        pair: v.optional(v.string()),
        algorithm: v.optional(v.string()),
        minPower: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        let signals = await ctx.db
            .query("signals")
            .withIndex("by_status", (q) => q.eq("status", "active"))
            .order("desc")
            .take(100);

        // Apply filters
        if (args.pair) {
            signals = signals.filter((s) => s.pair === args.pair);
        }
        if (args.algorithm) {
            signals = signals.filter((s) => s.algorithm === args.algorithm);
        }
        if (args.minPower) {
            signals = signals.filter((s) => s.power >= args.minPower);
        }

        return signals;
    },
});

// Create a new signal (admin only)
export const createSignal = mutation({
    args: {
        pair: v.string(),
        type: v.union(v.literal("CALL"), v.literal("PUT")),
        power: v.number(),
        algorithm: v.union(
            v.literal("Adaptive"),
            v.literal("Neural"),
            v.literal("Trend")
        ),
        entryPrice: v.number(),
        targetPrice: v.optional(v.number()),
        stopLoss: v.optional(v.number()),
        expiryMinutes: v.number(),
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        const expiryTime = now + args.expiryMinutes * 60 * 1000;

        const signalId = await ctx.db.insert("signals", {
            pair: args.pair,
            type: args.type,
            power: args.power,
            algorithm: args.algorithm,
            entryPrice: args.entryPrice,
            targetPrice: args.targetPrice,
            stopLoss: args.stopLoss,
            expiryTime,
            status: "active",
            createdAt: now,
        });

        return signalId;
    },
});

// Update signal status
export const updateSignalStatus = mutation({
    args: {
        signalId: v.id("signals"),
        status: v.union(
            v.literal("active"),
            v.literal("expired"),
            v.literal("won"),
            v.literal("lost")
        ),
        result: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.signalId, {
            status: args.status,
            result: args.result,
        });
    },
});

// Get signal by ID
export const getSignalById = query({
    args: { signalId: v.id("signals") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.signalId);
    },
});

// Get signals count by status
export const getSignalsStats = query({
    args: {},
    handler: async (ctx) => {
        const allSignals = await ctx.db.query("signals").collect();

        const stats = {
            total: allSignals.length,
            active: allSignals.filter((s) => s.status === "active").length,
            won: allSignals.filter((s) => s.status === "won").length,
            lost: allSignals.filter((s) => s.status === "lost").length,
            expired: allSignals.filter((s) => s.status === "expired").length,
        };

        const winRate = stats.won + stats.lost > 0
            ? (stats.won / (stats.won + stats.lost)) * 100
            : 0;

        return {
            ...stats,
            winRate: Math.round(winRate * 10) / 10,
        };
    },
});
