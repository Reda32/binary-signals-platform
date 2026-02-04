import { internalMutation, internalAction } from "./_generated/server";
import { generateAllSignals } from "./algorithms/signals";

// Generate new signals (called by cron job)
export const generateSignals = internalMutation({
    args: {},
    handler: async (ctx) => {
        const signals = generateAllSignals();

        const createdSignals = [];
        for (const signal of signals) {
            const now = Date.now();
            const expiryTime = now + signal.expiryMinutes * 60 * 1000;

            const signalId = await ctx.db.insert("signals", {
                pair: signal.pair,
                type: signal.type,
                power: signal.power,
                algorithm: signal.algorithm,
                entryPrice: signal.entryPrice,
                targetPrice: signal.targetPrice,
                stopLoss: signal.stopLoss,
                expiryTime,
                status: "active",
                createdAt: now,
            });

            createdSignals.push(signalId);
        }

        console.log(`Generated ${createdSignals.length} new signals`);
        return createdSignals;
    },
});

// Expire old signals (called by cron job)
export const expireOldSignals = internalMutation({
    args: {},
    handler: async (ctx) => {
        const now = Date.now();

        const activeSignals = await ctx.db
            .query("signals")
            .withIndex("by_status", (q) => q.eq("status", "active"))
            .collect();

        let expiredCount = 0;
        for (const signal of activeSignals) {
            if (signal.expiryTime < now) {
                await ctx.db.patch(signal._id, {
                    status: "expired",
                });
                expiredCount++;
            }
        }

        if (expiredCount > 0) {
            console.log(`Expired ${expiredCount} signals`);
        }

        return expiredCount;
    },
});
